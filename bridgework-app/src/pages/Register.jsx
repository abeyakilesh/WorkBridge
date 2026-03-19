import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import Button from "../components/Button";
import Card from "../components/Card";
import Toast from "../components/Toast";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    trade: "",
    location: "",
    experience: "",
    aadhaar: "",
  });
  
  // States for ML & Camera
  const [idPhoto, setIdPhoto] = useState(null);
  const [workPhoto, setWorkPhoto] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const trades = ["Electrician", "Plumber", "Carpenter", "Painter", "Mason", "Technician"];
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "aadhaar") {
      const val = value.replace(/\D/g, "").slice(0, 12);
      setFormData({ ...formData, [name]: val });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Run ML Text Extraction
  const performOCR = async (imageSrc) => {
    setIsScanning(true);
    setToast({ message: "ML Scanning active... reading your ID.", type: "success" });
    try {
      const { data: { text } } = await Tesseract.recognize(imageSrc, 'eng');
      console.log("Extracted Text: ", text);

      let extractedAadhaar = formData.aadhaar;
      let extractedName = formData.name;

      // Extract 12 digit Aadhaar
      const aadhaarRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
      const match = text.match(aadhaarRegex);
      if (match) {
        extractedAadhaar = match[0].replace(/\s/g, "");
      }

      // Very Simple Name extraction: Taking a prominent text line
      const lines = text.split('\n').filter(line => line.trim().length > 3 && !line.includes(/\d/));
      if (!extractedName && lines.length > 0) {
        // Just predicting the first purely text line as name
        const potentialName = lines[0].replace(/[^a-zA-Z\s]/g, "").trim().slice(0, 30);
        if (potentialName) extractedName = potentialName;
      }

      setFormData(prev => ({ ...prev, aadhaar: extractedAadhaar, name: extractedName }));
      
      if (match) {
        setToast({ message: "Successfully extracted Aadhaar & Info!", type: "success" });
      } else {
        setToast({ message: "Scan complete. Fill remaining fields manually.", type: "info" });
      }

    } catch (error) {
      console.error(error);
      setToast({ message: "OCR failed. Please enter details manually.", type: "error" });
    } finally {
      setIsScanning(false);
    }
  };

  const captureWebcam = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setIdPhoto(imageSrc);
      setShowWebcam(false);
      performOCR(imageSrc);
    }
  }, [webcamRef, performOCR]);

  const handleIdFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdPhoto(reader.result);
        performOCR(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setWorkPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.aadhaar.length !== 12) {
      setToast({ message: "Aadhaar must be exactly 12 digits.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call saving data, ID Photo, and Work Photo
    setTimeout(() => {
      setIsSubmitting(false);
      setIsVerified(true);
      setToast({ message: "Registration & Verification successful!", type: "success" });
    }, 1500);
  };

  if (isVerified) {
    return (
      <div className="min-h-[calc(100vh-80px)] pt-24 pb-16 px-4 flex items-center justify-center bg-bg-light">
        <Card className="max-w-xl w-full p-10 text-center animate-fade-in-up border-0 shadow-lg ring-1 ring-gray-100">
          <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-sm">
            <svg className="w-14 h-14 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-text-dark mb-4">Registration Complete!</h2>
          <p className="text-text-muted text-lg mb-8 leading-relaxed">
            Welcome to BridgeWork, <span className="font-semibold text-text-dark">{formData.name}</span>. 
            Your ID and work photos have been securely stored.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 text-primary border border-blue-200 rounded-xl font-bold shadow-sm">
            Verified AI Document Scan
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 pb-16 px-4 flex flex-col items-center justify-center bg-bg-light relative overflow-hidden">
      <div className="absolute top-10 left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl w-full relative z-10">
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
        
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-text-dark mb-4">Join BridgeWork</h1>
          <p className="text-text-muted text-lg">Register with Instant ID Verification</p>
        </div>

        <Card className="p-8 sm:p-12 animate-fade-in-up stagger-1 border-t-8 border-t-primary shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* ID Scanning Section */}
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
               <h3 className="text-lg font-bold text-gray-800 mb-2">1. Quick ID Scan (Aadhaar / Driving License)</h3>
               <p className="text-sm text-gray-500 mb-4">Upload or take a photo of your ID. Our ML will auto-fill your details!</p>
               
               {showWebcam ? (
                 <div className="flex flex-col items-center gap-4">
                   <Webcam
                     audio={false}
                     ref={webcamRef}
                     screenshotFormat="image/jpeg"
                     className="w-full max-w-sm rounded-lg border border-gray-300"
                   />
                   <div className="flex gap-4">
                     <Button type="button" onClick={captureWebcam} className="bg-green-600 hover:bg-green-700">Capture ID</Button>
                     <Button type="button" onClick={() => setShowWebcam(false)} className="bg-red-500 hover:bg-red-600 text-white border-0">Cancel</Button>
                   </div>
                 </div>
               ) : idPhoto ? (
                 <div className="flex flex-col animate-fade-in">
                    <img src={idPhoto} alt="Captured ID" className="w-full max-w-xs rounded-md shadow-md mb-4 border" />
                    <Button type="button" onClick={() => setIdPhoto(null)} className="text-xs bg-gray-200 text-gray-800 hover:bg-gray-300 w-32">Retake ID</Button>
                 </div>
               ) : (
                 <div className="flex flex-wrap gap-4">
                   <Button type="button" onClick={() => setShowWebcam(true)} className="flex items-center gap-2">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                     Capture via Web Camera
                   </Button>
                   <div className="relative">
                      <Button type="button" className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                         Upload File (PDF/PNG)
                      </Button>
                      <input type="file" accept="image/*" onChange={handleIdFileUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                   </div>
                 </div>
               )}

               {isScanning && (
                 <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-xl">
                    <div className="flex flex-col items-center">
                       <svg className="animate-spin h-8 w-8 text-primary mb-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                       <p className="font-bold text-primary animate-pulse">Running ML Optical Character Recognition...</p>
                    </div>
                 </div>
               )}
            </div>

            <div className={`transition-opacity duration-500 ${isScanning ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">2. Personal Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Trade / Skill</label>
                    <div className="relative">
                      <select
                        name="trade"
                        required
                        value={formData.trade}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none shadow-sm bg-white"
                      >
                        <option value="" disabled>Select trade</option>
                        {trades.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-muted">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Experience (Years)</label>
                    <input
                      type="number"
                      name="experience"
                      required
                      min="0"
                      max="50"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 5"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Andheri West, Mumbai"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1 flex justify-between">
                    <span>Aadhaar Number <span className="text-xs text-text-muted font-normal">(12 digits)</span></span>
                    {formData.aadhaar.length === 12 && <span className="text-green-500 font-bold text-xs uppercase flex items-center"><svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> Verified</span>}
                  </label>
                  <input
                    type="text"
                    name="aadhaar"
                    required
                    value={formData.aadhaar}
                    onChange={handleChange}
                    placeholder="XXXX XXXX XXXX"
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all shadow-sm font-mono tracking-wider ${formData.aadhaar.length === 12 ? 'border-green-300 focus:border-green-400 focus:ring-green-400/20 bg-green-50' : 'border-gray-200 focus:border-primary focus:ring-primary/20'}`}
                  />
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">3. Upload Work Photo <span className="text-sm font-normal text-gray-500">(Optional)</span></h3>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden">
                    {workPhoto ? (
                       <div className="absolute inset-0 bg-gray-900/10 flex items-center justify-center backdrop-blur-sm">
                           <p className="font-bold text-gray-800 flex items-center bg-white px-4 py-2 rounded-full shadow"><svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> {workPhoto.name}</p>
                       </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mb-2 text-sm text-text-muted">
                          <span className="font-semibold text-primary">Upload a photo</span> of your past work
                        </p>
                      </div>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleWorkFileUpload} />
                  </label>
                </div>
              </div>

              <div className="pt-8">
                <Button type="submit" className="w-full h-14 text-xl font-bold shadow-md hover:shadow-lg" disabled={isSubmitting || isScanning}>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying Profile...
                    </span>
                  ) : "Submit Registration"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
