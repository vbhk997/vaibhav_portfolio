import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import * as THREE from 'three';
import './CADViewer.css';

// WebGL Support Detection
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

// 3D Model Component for STL files
function Model({ url }) {
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef();
  
  useEffect(() => {
    if (geometry && meshRef.current) {
      // Center the geometry
      geometry.computeBoundingBox();
      const center = geometry.boundingBox.getCenter(new THREE.Vector3());
      geometry.translate(-center.x, -center.y, -center.z);
      
      // Scale the geometry to fit in view
      const size = geometry.boundingBox.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDimension;
      meshRef.current.scale.setScalar(scale);
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial 
        color="#60a5fa" 
        metalness={0.1} 
        roughness={0.3}
        transparent={true}
        opacity={0.9}
      />
    </mesh>
  );
}

// Loading component
function Loader() {
  return (
    <div className="cad-loader">
      <div className="cad-spinner"></div>
      <p>Loading STL Model...</p>
    </div>
  );
}

// WebGL Unsupported Component
function WebGLUnsupported() {
  return (
    <div className="cad-webgl-unsupported">
      <p>3D model cannot be displayed on this browser</p>
    </div>
  );
}

// Error boundary component
class CADErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CAD Viewer Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="cad-error">
          <div className="cad-error-icon">⚠️</div>
          <h3>Unable to Load 3D Model</h3>
          <p>The STL file could not be loaded. Please check that the file exists and is a valid STL format.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const CADViewer = ({ isOpen, onClose, cadFile, projectTitle }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const supported = checkWebGLSupport();
      setWebglSupported(supported);
      if (supported) {
        setIsLoading(true);
      }
    }
  }, [isOpen]);

  if (!isOpen || !cadFile) return null;

  return (
    <div className="cad-modal-overlay" onClick={onClose}>
      <div className="cad-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cad-modal-header">
          <h2 className="cad-modal-title">3D Model Viewer</h2>
          <p className="cad-modal-subtitle">{projectTitle}</p>
          <button className="cad-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="cad-viewer-container">
          {!webglSupported ? (
            <WebGLUnsupported />
          ) : (
            <>
              <CADErrorBoundary>
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 50 }}
                  onCreated={() => setIsLoading(false)}
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <pointLight position={[-10, -10, -5]} intensity={0.5} />
                  
                  <Suspense fallback={null}>
                    <Model url={cadFile} />
                  </Suspense>
                  
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={2}
                    maxDistance={20}
                  />
                  <Environment preset="studio" />
                </Canvas>
              </CADErrorBoundary>
              
              {isLoading && <Loader />}
            </>
          )}
        </div>

        {webglSupported && (
          <div className="cad-modal-footer">
            <div className="cad-controls-info">
              <p>🖱️ Left click + drag to rotate</p>
              <p>🖱️ Right click + drag to pan</p>
              <p>🖱️ Scroll to zoom</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CADViewer;
