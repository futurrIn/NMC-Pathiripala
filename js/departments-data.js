const DEPARTMENTS_DATA = {
  "general-medicine": {
    name: "General Medicine & Diabetology",
    description: "Comprehensive healthcare for acute and chronic conditions, specializing in diabetes management and preventative wellness.",
    heroImage: "assets/images/department_bento/general_medicine.webp",
    intro: "Our General Medicine & Diabetology department is dedicated to providing superior clinical services for diagnosing and treating a broad spectrum of medical conditions, from common infections to complex metabolic syndromes.",
    careHighlights: [
      "Expert blood sugar monitoring and customized diabetes therapies",
      "Advanced screening for metabolic and cardiovascular risk factors",
      "Comprehensive geriatric health assessments and chronic pain management",
      "Routine healthcare check-ups, preventative physical examinations, and wellness counseling"
    ],
    doctors: [
      {
        name: "Dr. Akhil Prakash",
        title: "Senior Consultant - General Medicine",
        qualifications: "MBBS, MD, DNB (General Medicine)",
        image: "assets/images/Doctors/Dr.Akhil Prakash.webp",
        bio: "Dr. Akhil Prakash has over 12 years of clinical experience in treating complex internal medicine cases and metabolic disorders. He is renowned for his patient-centered approach to diabetes management."
      }
    ]
  },
  "radiology": {
    name: "Radiology",
    description: "Advanced medical imaging services including X-rays, ultrasounds, and diagnostic scans for accurate and fast health insights.",
    heroImage: "assets/images/department_bento/radiology.webp",
    intro: "Our Radiology department utilizes state-of-the-art imaging technology to deliver precise diagnosis, helping physicians plan accurate and timely treatment pathways.",
    careHighlights: [
      "High-resolution digital X-rays with minimized radiation exposure",
      "Advanced 3D/4D ultrasound imaging for obstetric and clinical diagnoses",
      "Specialized color Doppler scan studies for vascular systems",
      "Rapid turnaround times on imaging reports for prompt diagnosis"
    ],
    doctors: [
      {
        name: "Dr. Mario Jose",
        title: "Consultant Radiologist",
        qualifications: "MBBS, MD (Radiology)",
        image: "assets/images/Doctors/Dr.Mario Jose.webp",
        bio: "Dr. Mario Jose is a specialist in interventional and diagnostic radiology with a focused interest in pediatric imaging and musculoskeletal scans."
      },
      {
        name: "Dr. Naffir",
        title: "Radiology Department",
        qualifications: "MBBS, MD (Radiology)",
        image: "",
        bio: ""
      }
    ]
  },
  "dental": {
    name: "Dental Department",
    description: "Expert dental care from routine cleanings to advanced orthodontics, keeping your smile bright and healthy.",
    heroImage: "assets/images/department_bento/Dental.webp",
    galleryImages: [
      "assets/images/hospital 2/Dental1.webp",
      "assets/images/hospital 2/Dental3.webp"
    ],
    intro: "Our Dental Department offers comprehensive oral healthcare under one roof, using modern sterilizers and high-tech diagnostics to deliver pain-free treatments.",
    careHighlights: [
      "Routine dental cleaning, scaling, and whitening treatments",
      "Advanced root canal therapies (RCT) and tooth restoration procedures",
      "Orthodontics (braces and aligners) and pediatric dental management",
      "Prosthodontics including dental crowns, bridges, and partial/full dentures"
    ],
    doctors: [
      {
        name: "Dr. Sagma",
        title: "General Dentist",
        qualifications: "BDS",
        image: "assets/images/Doctors/Dr.Sagma.webp",
        bio: "Dr. Sagma provides cosmetic dental procedures, dental fillings, and root canal therapy. She makes dental visits stress-free and pain-free."
      },
      {
        name: "Dr. Hridya",
        title: "Senior Dental Specialist",
        qualifications: "BDS, MDS",
        image: "assets/images/doctor_ananya.webp",
        bio: "Dr. Hridya specializes in orthodontics and oral surgery. She brings advanced MDS-level clinical training to handle complex restorative cases."
      }
    ]
  },
  "paediatrics": {
    name: "Paediatrics",
    description: "Compassionate medical care for infants, children, and adolescents, supporting healthy growth and development.",
    heroImage: "assets/images/department_bento/paediatrics.webp",
    intro: "Our Paediatrics department focuses on physical, emotional, and social wellness of children, from birth through adolescence, in a child-friendly clinic environment.",
    careHighlights: [
      "Standard newborn care and pediatric growth & development tracking",
      "Complete pediatric vaccination protocols and immunization schedules",
      "Management of acute childhood respiratory, stomach, and infectious conditions",
      "Dedicated adolescent healthcare and counseling services"
    ],
    doctors: [
      {
        name: "Dr. Sajeev Kumar",
        title: "Senior Pediatrician",
        qualifications: "MBBS, MD (Paediatrics)",
        image: "assets/images/Doctors/Dr. Sajeev Kumar.webp",
        bio: "Dr. Sajeev Kumar is a pediatrician with 15+ years of clinical practice. He is an expert in childhood nutrition and developmental assessment."
      }
    ]
  },
  "casualty": {
    name: "Casualty & Trauma Care",
    description: "24/7 emergency services equipped with expert medical staff to handle trauma, critical injuries, and urgent care.",
    heroImage: "assets/images/department_bento/casualty.webp",
    intro: "Our Casualty & Trauma department operates round-the-clock to manage critical emergencies, medical trauma, and acute distress with instant triaging.",
    careHighlights: [
      "24/7 dedicated emergency response team and fully equipped trauma beds",
      "Rapid triage system to prioritize and treat life-threatening conditions",
      "Instant diagnostic support (X-rays, lab testing) for quick assessment",
      "Surgical preparation and emergency resuscitation setups"
    ],
    doctors: [
      {
        name: "Dr. Jothimurugan",
        title: "Emergency Medical Officer",
        qualifications: "MBBS",
        image: "assets/images/Doctors/Dr.Jothimurugan.webp",
        bio: "Dr. Jothimurugan specializes in emergency medicine, trauma life support, and rapid-response stabilization protocols."
      }
    ]
  },
  "psychology": {
    name: "Psychology",
    description: "Professional counseling and psychological therapy services to support mental well-being, mindfulness, and emotional health.",
    heroImage: "assets/images/department_bento/psychology.webp",
    intro: "Our Psychology department provides clinical counseling and therapeutic sessions to assist individuals in managing stress, emotional issues, and cognitive behavioral development.",
    careHighlights: [
      "Cognitive Behavioral Therapy (CBT) and clinical stress management",
      "Family, couple, and relationship counseling sessions",
      "Therapeutic interventions for depression, anxiety, and sleep disorders",
      "Child and adolescent psychological evaluations and behavioral training"
    ],
    doctors: [
      {
        name: "Dr. K. Radhakrishnan",
        title: "Senior Clinical Psychologist",
        qualifications: "M.Sc. (Applied Psychology), M.Phil., PhD",
        image: "assets/images/Doctors/Dr.K.Radhakrishnan.webp",
        bio: "Dr. K. Radhakrishnan is a respected clinical psychologist with multiple research papers and over 20 years of experience helping patients build emotional resilience."
      }
    ]
  },
  "physiotherapy": {
    name: "Physiotherapy",
    description: "Customized physical therapy and rehabilitation programs to restore mobility, alleviate pain, and rebuild strength.",
    heroImage: "assets/images/department_bento/physiotherapy.webp",
    intro: "Our Physiotherapy department offers rehabilitative treatment programs customized to rebuild muscle function, improve joint range-of-motion, and manage post-operative recovery.",
    careHighlights: [
      "Post-operative orthopedic rehabilitation and joint replacement recovery",
      "Neurological physiotherapy for stroke, parkinsonism, and nerve conditions",
      "Specialized posture correction and back-pain therapy programs",
      "Sports injury recovery and physical performance rehabilitation"
    ],
    doctors: [
      {
        name: "Mr. Shyam Kumar",
        title: "Consultant Physiotherapist",
        qualifications: "BPT, MPT (Neuro)",
        image: "assets/images/Doctors/Mr. ShyamKumar.webp",
        bio: "Mr. Shyam Kumar specializes in neuro-physiotherapy, assisting patients in restoring physical balance, coordination, and post-stroke movement recovery."
      }
    ]
  },
  "cardiology": {
    name: "Cardiology",
    description: "Specialized heart care and diagnostic testing for cardiovascular health, heart attack prevention, and long-term cardiac wellness.",
    heroImage: "assets/images/department_bento/cardiology.webp",
    intro: "Our Cardiology department stands at the forefront of cardiovascular medicine, offering primary preventative and advanced management strategies for heart disorders.",
    careHighlights: [
      "Comprehensive diagnostic screening (ECG, Echocardiogram, TMT stress testing)",
      "Management of coronary artery disease, heart failure, and heart valve issues",
      "Expert treatment for hypertension and vascular disease panels",
      "Heart-health lifestyle management and preventative cardiac counseling"
    ],
    doctors: [
      {
        name: "Dr. Rajesh Kumar",
        title: "Senior Consultant Cardiologist",
        qualifications: "MBBS, MD, DM (Cardiology)",
        image: "assets/images/Doctors/Dr. Rajeshkumar.webp",
        bio: "Dr. Rajesh Kumar has over 18 years of cardiology experience, focusing on heart attack prevention and clinical management of complex arrhythmias."
      }
    ]
  },
  "gastro": {
    name: "Gastroenterology",
    description: "Comprehensive treatment for digestive tract disorders, liver care, stomach issues, and gastrointestinal health.",
    heroImage: "assets/images/department_bento/gastroenterology.webp",
    intro: "Our Gastroenterology department manages disorders of the esophagus, stomach, intestines, liver, gallbladder, and pancreas with high clinical precision.",
    careHighlights: [
      "Diagnosis and management of acid reflux, IBS, and peptic ulcers",
      "Treatment programs for liver disease, fatty liver, and hepatitis",
      "Comprehensive screening and preventative gastroscopic evaluations",
      "Dietary and therapeutic clinical plans for chronic bowel conditions"
    ],
    doctors: [
      {
        name: "Dr. Sandheep Janardhanan",
        title: "Senior Gastroenterologist",
        qualifications: "MBBS, MD (Internal Medicine), DNB (Gastroenterology), MRCP (UK), ESEGH",
        image: "assets/images/Doctors/Dr.Sandheep.webp",
        bio: "Dr. Sandheep Janardhanan is a highly qualified specialist with MRCP validation from the United Kingdom. He has extensive expertise in managing gastrointestinal and hepatic disorders."
      }
    ]
  },
  "neurology": {
    name: "Neurology",
    description: "Advanced diagnosis and clinical care for brain, spine, nerve disorders, and neurological conditions.",
    heroImage: "assets/images/department_bento/neurology.webp",
    intro: "Our Neurology department delivers clinical evaluations and treatments for neurological disorders affecting the brain, spinal cord, nerves, and muscles.",
    careHighlights: [
      "Treatment for migraine, chronic headaches, and neuropathic pain patterns",
      "Specialized diagnosis and management protocols for epilepsy and seizures",
      "Comprehensive support for neurodegenerative conditions (Alzheimer's, Parkinson's)",
      "Management of neuromuscular disorders, neuropathies, and neuro-muscular pain"
    ],
    doctors: [
      {
        name: "Dr. Sreevalli",
        title: "Consultant Neurosurgeon",
        qualifications: "MBBS, MS, MCh",
        image: "",
        bio: "Dr. Sreevalli specializes in neurology and microsurgical procedures for spinal and cranial conditions with a compassionate patient approach."
      }
    ]
  },
  "urology": {
    name: "Urology",
    description: "Specialized clinical care for urinary tract conditions, kidney wellness, and reproductive health.",
    heroImage: "assets/images/department_bento/urology.webp",
    intro: "Our Urology department handles surgical and medical conditions of the urinary system for both genders, alongside male reproductive organs.",
    careHighlights: [
      "Non-invasive and minimally invasive management of kidney stones",
      "Treatment for prostate enlargement (BPH) and urinary tract infections (UTIs)",
      "Expert diagnostic scans and medical management of bladder issues",
      "Clinical consulting for male fertility and urological reproductive health"
    ],
    doctors: [
      {
        name: "Dr. Eswaran",
        title: "Senior Consultant Urologist",
        qualifications: "MBBS, MS, MCh (Urology)",
        image: "assets/images/Doctors/Dr.Eswaran.webp",
        bio: "Dr. Eswaran has 14+ years of specialized experience in reconstructive urology and advanced treatment of renal tract calculus."
      }
    ]
  },
  "pulmonology": {
    name: "Pulmonology",
    description: "Expert care for respiratory issues, lung diseases, asthma management, and breathing disorders.",
    heroImage: "assets/images/department_bento/pulmonology.webp",
    intro: "Our Pulmonology department provides therapeutic care for lung disease, pulmonary infections, asthma, COPD, and sleep-disordered breathing problems.",
    careHighlights: [
      "Comprehensive asthma and allergy screening and inhaler therapy tuning",
      "COPD and smoking-cessation clinical program guides",
      "Diagnosis and clinical care for tuberculosis and atypical pneumonia",
      "Diagnostic checks for sleep apnea and sleep-related breathing syndromes"
    ],
    doctors: [
      {
        name: "Dr. Noufal Chooriyath",
        title: "Consultant Pulmonologist",
        qualifications: "MBBS, MD, DNB (Pulmonology)",
        image: "assets/images/Doctors/Dr.Noufal chooriyath.webp",
        bio: "Dr. Noufal is a specialist in respiratory medicine, treating severe asthma, interstitial lung diseases, and critical care pulmonary issues."
      }
    ]
  },
  "surgery": {
    name: "General Surgery",
    description: "State-of-the-art surgical procedures for varied medical conditions, focusing on safety and rapid recovery.",
    heroImage: "assets/images/department_bento/general_surgery.webp",
    intro: "Our General Surgery department provides diagnostic screening, pre-operative management, and advanced surgical interventions for varied gastrointestinal, abdominal, and vascular conditions.",
    careHighlights: [
      "Advanced laparoscopic surgeries for hernia, appendix, and gallstones",
      "Minimal-access surgeries to speed up post-op healing times",
      "Expert diagnostic endoscopy and gastrointestinal surgery pathways",
      "Trauma surgery support and soft tissue wound recovery procedures"
    ],
    doctors: [
      {
        name: "Dr. Animesh",
        title: "Senior General Surgeon",
        qualifications: "MBBS, MS (General Surgery)",
        image: "assets/images/Doctors/DR.Animesh.webp",
        bio: "Dr. Animesh is an expert in minimally invasive laparoscopic procedures and complex abdominal operations, prioritizing surgical safety."
      }
    ]
  },
  "ent": {
    name: "ENT (Ear, Nose & Throat)",
    description: "Expert diagnosis and medical care for ear, nose, and throat ailments, sinus problems, and hearing issues.",
    heroImage: "assets/images/department_bento/ent.webp",
    intro: "Our ENT department treats diverse ear, nose, and throat medical conditions, alongside balance disorders and pediatric ENT ailments.",
    careHighlights: [
      "Clinical treatment of ear discharge, hearing loss, and balance issues",
      "Diagnostic nasal screening and sinus pain/allergy treatments",
      "Surgical consultation for tonsils, adenoids, and middle-ear issues",
      "Voice and speech disorder clinical consultations"
    ],
    doctors: [
      {
        name: "Dr. Vidya V. Nair",
        title: "Consultant ENT Surgeon",
        qualifications: "MBBS, MS (ENT)",
        image: "assets/images/Doctors/Dr.vidya v Nair.webp",
        bio: "Dr. Vidya V. Nair is a specialist in microscopic ear surgeries and functional endoscopic sinus surgery (FESS)."
      }
    ]
  },
  "ortho": {
    name: "Orthopaedics",
    description: "Comprehensive care for bones, joints, muscles, ligaments, and sports injuries, helping you move freely and pain-free.",
    heroImage: "assets/images/department_bento/orthopaedics.webp",
    intro: "Our Orthopaedics department treats bones, joints, ligaments, tendons, and muscles. We specialize in joint replacement, sports injuries, and fracture healing.",
    careHighlights: [
      "Advanced treatment for arthritis, osteopenia, and degenerative bone disease",
      "Minimally invasive fracture surgeries and cast/traction stabilization",
      "Knee and hip joint replacement consultation and post-op care",
      "Diagnostic and physical therapy mapping for ligaments and tendon injury"
    ],
    doctors: [
      {
        name: "Dr. Sajith",
        title: "Senior Orthopaedic Specialist",
        qualifications: "MBBS, D-Ortho, DNB-Ortho",
        image: "assets/images/Doctors/Dr.Sajith.webp",
        bio: "Dr. Sajith specializes in complex trauma care and arthroscopic knee/hip joint surgeries with a history of successful recovery rates."
      },
      {
        name: "Dr. Vinoth K",
        title: "Orthopaedic Surgeon",
        qualifications: "MBBS, D-Ortho, DNB",
        image: "assets/images/Doctors/Dr. Vinoth K.webp",
        bio: "Dr. Vinoth K is a highly skilled Orthopaedic Surgeon specializing in trauma, joint disorders, and musculoskeletal rehabilitation at NMC Pathiripala."
      }
    ]
  },
  "gynaecology": {
    name: "Gynaecology",
    description: "Compassionate healthcare for women at every stage of life, including prenatal care, pregnancy, and reproductive wellness.",
    heroImage: "assets/images/department_bento/gynaecology.webp",
    intro: "Our Obstetrics & Gynaecology department provides supportive and complete wellness check-ups, diagnostic scans, prenatal pregnancy care, and female health solutions.",
    careHighlights: [
      "Complete prenatal screening, routine antenatal check-ups, and pregnancy panels",
      "Management of high-risk pregnancies and childbirth support",
      "Specialized consultation for PCOD, PCOS, irregular cycles, and menopause",
      "Minimally invasive gynaecological surgeries and diagnostic screenings"
    ],
    doctors: [
      {
        name: "Dr. Shailaja",
        title: "Senior Consultant Gynecologist",
        qualifications: "MBBS, DGO",
        image: "assets/images/Doctors/Dr.Shailaja.webp",
        bio: "Dr. Shailaja has 20+ years of dedicated practice in obstetrics, guiding expectant mothers safely through high-risk pregnancies and child delivery."
      },
      {
        name: "Dr. Nithya Nambiar",
        title: "Gynecologist & Laparoscopic Surgeon",
        qualifications: "MBBS, DGO, DNB, FMAS, DMAS (Obstetrician & Gynaecologist)",
        image: "assets/images/Doctors/Dr. Nithya Nambiar.webp",
        bio: "Dr. Nithya Nambiar has advanced qualifications in minimally invasive keyhole gynecological surgery, offering fast-recovery laparoscopic procedures."
      }
    ]
  }
};
