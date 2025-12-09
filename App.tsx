import React, { useState } from 'react';
import IdefDiagram from './components/IdefDiagram';
import ImageEditor from './components/ImageEditor';
import { CONTEXT_DIAGRAM, DECOMPOSITION_DIAGRAM } from './constants';
import { IdefType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'DIAGRAM' | 'EDITOR'>('DIAGRAM');
  const [diagramType, setDiagramType] = useState<IdefType>(IdefType.CONTEXT);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold font-serif">DS</div>
             <h1 className="text-xl font-bold tracking-wide">DevStudioOS</h1>
          </div>
          
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('DIAGRAM')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'DIAGRAM' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              IDEF0 Diagrams
            </button>
            <button
              onClick={() => setActiveTab('EDITOR')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'EDITOR' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              AI Image Editor
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'DIAGRAM' && (
          <div className="space-y-6">
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setDiagramType(IdefType.CONTEXT)}
                className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                  diagramType === IdefType.CONTEXT
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                A-0 Context Diagram
              </button>
              <button
                onClick={() => setDiagramType(IdefType.DECOMPOSITION)}
                className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                  diagramType === IdefType.DECOMPOSITION
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                A0 Decomposition
              </button>
            </div>

            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
               <IdefDiagram 
                 data={diagramType === IdefType.CONTEXT ? CONTEXT_DIAGRAM : DECOMPOSITION_DIAGRAM} 
               />
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                 <div className="flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-black"></span>
                    <span>Left: Inputs</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-black"></span>
                    <span>Top: Controls</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-black"></span>
                    <span>Bottom: Mechanisms</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-black"></span>
                    <span>Right: Outputs</span>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'EDITOR' && (
          <ImageEditor />
        )}

      </main>

      <footer className="bg-slate-900 text-slate-400 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>&copy; 2024 DevStudioOS System Architecture. Powered by React & Gemini.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
