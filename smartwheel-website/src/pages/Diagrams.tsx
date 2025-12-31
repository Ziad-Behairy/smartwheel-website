import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import mermaid from 'mermaid';

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
});

interface DiagramTabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const DiagramTab: React.FC<DiagramTabProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-semibold rounded-t-lg transition-all ${
      isActive
        ? 'bg-primary text-white shadow-lg'
        : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
    }`}
  >
    {label}
  </button>
);

const Diagrams: React.FC = () => {
  const [activeTab, setActiveTab] = useState('useCase');
  const mermaidRef = useRef<HTMLDivElement>(null);

  const diagrams = {
    useCase: {
      title: 'Use Case Diagram',
      description: 'Shows the main actors and their interactions with the SmartWheel system',
      mermaidCode: `
graph TB
    WU[Wheelchair User]
    CG[Caregiver]
    HP[Healthcare Professional]
    SYS[SmartWheel System]

    WU -->|Navigate| SYS
    WU -->|Talk to AI| SYS
    WU -->|Request Emergency| SYS

    CG -->|Monitor Vitals| SYS
    CG -->|View Timeline| SYS
    CG -->|Receive Alerts| SYS

    HP -->|Generate Reports| SYS
    HP -->|Configure Monitoring| SYS

    SYS -->|Auto-Navigate| WU
    SYS -->|Health Alerts| CG
    SYS -->|Emergency Notifications| CG
      `,
    },
    class: {
      title: 'Class Diagram',
      description: 'Core domain model showing relationships between key entities',
      mermaidCode: `
classDiagram
    class User {
        +String id
        +String name
        +String email
        +String role
        +authenticate()
        +updateProfile()
    }

    class WheelchairUser {
        +HealthRecord healthRecord
        +Location currentLocation
        +requestEmergency()
        +talkToAI()
    }

    class Caregiver {
        +List~Alert~ alerts
        +viewVitals()
        +acknowledgeAlert()
    }

    class HealthRecord {
        +List~VitalSigns~ vitals
        +Date timestamp
        +addVital()
        +getHistory()
    }

    class Alert {
        +String type
        +String message
        +Date timestamp
        +trigger()
    }

    User <|-- WheelchairUser
    User <|-- Caregiver
    WheelchairUser "1" --> "1" HealthRecord
    HealthRecord "1" --> "*" Alert
    Caregiver "1" --> "*" Alert
      `,
    },
    sequence: {
      title: 'Sequence Diagram - Emergency Alert Flow',
      description: 'Step-by-step emergency response workflow achieving sub-5-second alerts',
      mermaidCode: `
sequenceDiagram
    participant S as Sensors
    participant R as Raspberry Pi
    participant M as MQTT Broker
    participant C as Cloud Function
    participant F as Firestore
    participant N as FCM/SMS
    participant CG as Caregiver App

    S->>R: Fall detected (35° tilt)
    S->>R: HR: 145bpm, SpO2: 88%
    R->>R: Pattern matching
    R->>M: Publish emergency event (QoS 2)
    M->>C: Trigger Cloud Function
    C->>F: Query emergency contacts
    F-->>C: Return contact list
    par Multi-channel notification
        C->>N: Send FCM push
        C->>N: Send SMS
    end
    N->>CG: Alert received (< 5 seconds)
    CG->>CG: Display alert
    CG->>F: Acknowledge alert
      `,
    },
    activity: {
      title: 'Activity Diagram - Health Monitoring Loop',
      description: 'Continuous 60-second health monitoring cycle',
      mermaidCode: `
graph TD
    A[Start 60s Timer] --> B[Read Sensors in Parallel]
    B --> C{Data Valid?}
    C -->|No| D[Log Error]
    D --> A
    C -->|Yes| E[Analyze Vitals]
    E --> F{Status?}
    F -->|Normal| G[Update Realtime DB]
    F -->|Warning| H[Update DB + Push Notification]
    F -->|Critical| I[Trigger Emergency Flow]
    G --> A
    H --> A
    I --> J[Cloud Function]
    J --> K[Multi-Channel Alert]
    K --> A
      `,
    },
  };

  useEffect(() => {
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = diagrams[activeTab as keyof typeof diagrams].mermaidCode;
      mermaid.contentLoaded();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            UML Diagrams
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Visual representations of system design, architecture, and workflows
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <DiagramTab
            id="useCase"
            label="Use Case"
            isActive={activeTab === 'useCase'}
            onClick={() => setActiveTab('useCase')}
          />
          <DiagramTab
            id="class"
            label="Class Diagram"
            isActive={activeTab === 'class'}
            onClick={() => setActiveTab('class')}
          />
          <DiagramTab
            id="sequence"
            label="Sequence"
            isActive={activeTab === 'sequence'}
            onClick={() => setActiveTab('sequence')}
          />
          <DiagramTab
            id="activity"
            label="Activity"
            isActive={activeTab === 'activity'}
            onClick={() => setActiveTab('activity')}
          />
        </div>

        {/* Diagram Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            {diagrams[activeTab as keyof typeof diagrams].title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {diagrams[activeTab as keyof typeof diagrams].description}
          </p>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg overflow-x-auto">
            <div ref={mermaidRef} className="mermaid flex justify-center" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Diagrams;
