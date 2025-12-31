# SmartWheel System - Software Architecture & Design

## Executive Summary

SmartWheel is an AI-powered autonomous wheelchair system targeting Egypt's 12 million citizens with mobility challenges. The system integrates cutting-edge technologies at an affordable price point (25,000-35,000 EGP vs 100,000+ EGP for imported alternatives).

### Core Features

- **Autonomous Navigation**: Visual SLAM-based obstacle avoidance with voice commands
- **Health Monitoring**: Continuous tracking of heart rate, oxygen saturation, and body temperature
- **Emergency System**: Automatic fall detection with multi-channel caregiver alerts
- **AI Companion**: Arabic conversational AI with emotion recognition
- **Mobile Ecosystem**: Cross-platform caregiver app for remote monitoring

### Target Market
- 12 million Egyptian citizens with mobility challenges
- Locally-developed technology
- 60-75% cost reduction compared to imports

---

## System Architecture

### Architecture Overview

SmartWheel employs a **Hybrid Layered-Event-Driven Architecture** combining structural clarity with real-time responsiveness for health monitoring and emergency systems.

### Architecture Layers

#### 1. Presentation Layer
- **Mobile App** (Flutter): Cross-platform iOS/Android caregiver application
- **Web Dashboard**: Administrative interface for healthcare professionals
- **Tablet Interface**: On-wheelchair Android display for user interaction
- **Design Pattern**: MVVM for UI/business logic separation

#### 2. Application Layer
**Key Services:**
- **VitalProcessor**: Analyzes sensor data, detects anomalies, triggers alerts
- **NavigationController**: SLAM navigation, path planning, obstacle avoidance
- **EmergencyOrchestrator**: Multi-channel notifications (FCM, SMS, calls)
- **DataSyncManager**: Offline queuing and cloud synchronization

#### 3. Data Layer
- **Firestore**: NoSQL database for user accounts, health records, alerts
- **Cloud Storage**: Binary data (emotion timeline images, reports)
- **Collections**: `users/`, `healthRecords/`, `alerts/`, `emergencyEvents/`

#### 4. Event Layer
**Real-time Communication:**
- **MQTT Broker**: Lightweight pub/sub for Raspberry Pi → Cloud
- **WebSocket Server**: Full-duplex for mobile app ↔ cloud
- **FCM**: Push notifications to mobile devices

**Event Types:**
- VitalsUpdate (Normal) → Realtime Database → WebSocket
- CriticalAlert (High) → Cloud Function → FCM + SMS
- LocationUpdate (Normal) → MQTT → Realtime Database
- EmergencyTrigger (Critical) → Multi-channel

#### 5. Edge Layer
**Hardware Components:**
- **Raspberry Pi 5**: Central edge compute (Ubuntu 22.04)
- **Arduino Mega 2560**: Motor control, safety monitoring
- **Sensors**: MAX30102 (HR/SpO2), MLX90614 (temp), MPU6050 (IMU)
- **Cameras**: 2-4× RGB for ORB-SLAM navigation
- **Offline**: SQLite buffer for network outages

---

## Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Presentation** | Flutter | Cross-platform, 95% code reuse, Arabic RTL support |
| **Application** | Dart, Python (ROS) | Type-safe, async-first for real-time ops |
| **Data** | Firestore, Cloud Storage | Scalable NoSQL, automatic indexing, ACID guarantees |
| **Event** | MQTT, WebSocket, FCM | Low-bandwidth, full-duplex, reliable push |
| **Edge** | Python, C++ | ROS ecosystem, sensor drivers, performance |

---

## Architecture Decision Records (ADRs)

### ADR-001: Flutter for Cross-Platform Development

**Decision**: Adopt Flutter for all mobile and web interfaces

**Rationale:**
- **95%+ code reuse** between iOS, Android, and web
- **40% faster development** vs native (critical for 9-month timeline)
- **Built-in Arabic RTL** support for Egyptian market
- **60fps performance** on mid-range devices
- **Firebase integration** with official packages

**Trade-offs:**
- ✅ Reduced timeline by 6-8 weeks
- ✅ Consistent UI/UX across platforms
- ❌ Team must learn Dart (2-week ramp-up)
- ❌ APK 20-30MB larger (acceptable for 32GB+ devices)

### ADR-002: Hybrid MQTT/WebSocket Protocol

**Decision**: MQTT for Edge→Cloud, WebSocket for Cloud→Mobile, REST for infrequent ops

**Rationale:**
- **55% bandwidth reduction** (MQTT binary vs WebSocket text)
- **QoS levels**: 0 (location), 1 (vitals), 2 (emergencies)
- **Offline queue**: Messages stored during disconnects
- **50KB RAM** (MQTT) vs 200KB (WebSocket) on Raspberry Pi

**Performance:**
- 2.3-second average latency for critical alerts
- Automatic reconnection with message replay

### ADR-003: Firebase Backend Platform

**Decision**: Firestore + Realtime DB + Cloud Storage hybrid

**Rationale:**
- **Real-time listeners**: 200ms sync for dashboard updates
- **Offline persistence**: App works without network
- **ACID guarantees**: Transaction support for emergencies
- **99.9% cost reduction**: 1 daily write vs 1,440 (aggregation strategy)
- **Zero infrastructure**: Google manages scaling, backups

**Data Lifecycle:**
1. Vitals → Realtime DB (instant sync)
2. Midnight → Batch aggregate → Firestore (1/day)
3. Delete Realtime DB >24h old

**Estimated Cost:** $15-25/month for 100 users

### ADR-004: Firebase Authentication + RBAC

**Decision**: Firebase Auth with role-based access control

**Authentication Methods:**
- **Wheelchair User**: Email/Password + Phone OTP (2FA)
- **Caregiver**: Email/Password + Phone OTP
- **Healthcare Pro**: Email/Password + Google SSO
- **Raspberry Pi**: Custom Token (RSA-2048)

**Security Features:**
- Password complexity + rate limiting
- Custom claims for roles (embedded in JWT)
- Device tracking + new device alerts
- Firestore security rules at database level

---

## Development Methodology: Agile/Scrum

### Sprint Structure (18 sprints × 2 weeks = 9 months)

**Phase 1: Foundation** (Sprints 1-6)
- Hardware setup, SLAM basics, Mobile app skeleton

**Phase 2: MVP** (Sprints 7-12)
- Navigation + Health monitoring + Alerts

**Phase 3: Enhancement** (Sprints 13-16)
- AI companion, Emotion recognition, Optimization

**Phase 4: Finalization** (Sprints 17-18)
- Testing, Documentation, Bug fixes

### Sprint Ceremonies

| Activity | Duration | Frequency |
|----------|----------|-----------|
| Sprint Planning | 2 hours | Every 2 weeks (Monday 9AM) |
| Daily Standup | 15 minutes | Daily (10AM, Slack async) |
| Development | 8-10 days | Continuous |
| Sprint Review | 1 hour | Every 2 weeks (Friday 2PM) |
| Retrospective | 30 minutes | Every 2 weeks (Friday 3PM) |

### Key Metrics

- **Sprint Velocity**: 40-50 story points/sprint
- **Code Coverage**: >80%
- **Defect Density**: <5 bugs/1000 LOC
- **Team Satisfaction**: >4/5

### Why Agile?

1. **Hardware-Software Uncertainty**: SLAM performance unknown until tested
2. **Parallel Development**: 5 team members on different domains
3. **Supervisor Feedback**: Dr. Elshafei/Abd-Rabou every 2 weeks
4. **MVP Strategy**: Month 6 MVP aligned with incremental delivery
5. **Risk Mitigation**: Weekly integration tests from Month 2

---

## System Workflows

### Emergency Alert Flow (Critical Path)

**Trigger**: Fall detection + abnormal vitals

**Sequence (5-second target):**
1. **0-1s**: IMU detects tilt 35° + HR 145bpm + SpO2 88%
2. **1-2s**: Raspberry Pi pattern matching confirms fall
3. **2-3s**: MQTT → Cloud Function → Firestore query emergency contacts
4. **3-5s**: Parallel FCM push + SMS to caregiver

**Fallback**: If no caregiver response in 2 minutes → Auto-escalate to emergency services

### Health Monitoring Loop (Continuous)

**60-Second Cycle:**
1. **Parallel sensor read** (200ms): MAX30102, MLX90614, MPU6050
2. **Validate data** → Analyze vitals
3. **Normal**: Update Realtime DB → WebSocket sync to app
4. **Warning**: + Firestore write + Push notification
5. **Critical**: + Cloud Functions + SMS + Auto-call

**Data Tiers:**
- Current vitals: Realtime DB (24h TTL)
- Historical: Firestore daily batch (1 year TTL)
- Emotion images: Cloud Storage (3 months TTL)

---

## UML Models Summary

### Use Case Diagram
**4 Actor Groups:**
- Wheelchair User: Navigate, Talk to AI, Request Emergency
- Caregiver: Monitor Vitals, View Timeline, Receive Alerts
- Healthcare Professional: Generate Reports, Configure Monitoring
- System Administrator: Manage Accounts, View Diagnostics

### Class Diagram
**Key Patterns:**
- Inheritance: `User` → `WheelchairUser`, `Caregiver`, `HealthcareProfessional`
- Strategy: `Alert` → `CriticalAlert`, `WarningAlert`
- Composition: `HealthRecord` contains `VitalSigns`, `Location`
- Interfaces: `IAuthService`, `IDataRepository` (Firebase abstraction)

### Object Diagram
**Emergency Scenario Instance:**
- User: Mohamed (fall at 14:35:22)
- Vitals: HR 145bpm, SpO2 88%, Temp 36.8°C
- Location: Cairo (30.0155, 31.2089)
- Alert: 2× CriticalAlert → 1× EmergencyEvent
- Notification: 3-second delivery to caregiver Fatima

---

## Compliance & Security

### Egyptian Law 151/2020

- ✅ **User Consent**: Explicit opt-in with granular permissions
- ✅ **Data Minimization**: Only essential data collected
- ✅ **Right to Deletion**: 30-day purge on account delete
- ✅ **Geographic Storage**: EU region (GDPR-aligned)
- ✅ **Encryption**: AES-256 at rest, TLS 1.3 in transit

### Security Measures

- 2FA mandatory for caregivers
- Role-based access (custom JWT claims)
- Declarative Firestore security rules
- Audit logging to BigQuery
- Anomaly detection (new country, rapid logins)
- Session timeout: 30 days inactivity

---

## Team & Timeline

### Team 06 Members
- **Ziad Behairy**: Team Leader, Technical PM, Scrum Master
- **Omar Awad**: Mobile App Lead (Flutter)
- **Ahmed Amin**: AI/Security Lead
- **Mohamed Morshedy**: Backend Lead (Firebase)
- **Nourhan**: Navigation Lead (SLAM/ROS)

### Key Dates
- **Project Start**: October 2025
- **MVP Delivery**: April 2026 (Month 6, Sprint 12)
- **Final Submission**: June 2026
- **Total Duration**: 9 months (18 sprints)

### Development Tools
- **Project Management**: Jira
- **Communication**: Slack (#standups, #hardware, #software)
- **Version Control**: GitHub (feature/* branches, PR reviews)
- **CI/CD**: GitHub Actions (tests, linting, APK builds)

---

## Project Impact

### Market Opportunity
- **12 million** Egyptians with mobility challenges
- **60-75% cost reduction** vs imported wheelchairs
- **First** Egyptian university team at VEX U Worlds 2025

### Innovation
- Arabic conversational AI
- Visual SLAM in crowded Egyptian streets
- Emotion recognition timeline
- Multi-channel emergency system (SMS, call, GPS)

### Sustainability
- Open-source components (ROS, Flutter)
- Local manufacturing capability
- Affordable maintenance (commodity sensors)

---

## References

1. Fowler, M. (2003). *UML Distilled*. Addison-Wesley
2. Richards, M. & Ford, N. (2020). *Fundamentals of Software Architecture*. O'Reilly
3. Egyptian Law 151/2020 on Data Protection
4. Firebase Documentation (2025)
5. Flutter Framework Documentation (2025)
6. IEEE 42010:2011 - Architecture Description
