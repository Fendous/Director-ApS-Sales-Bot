import React, { useRef } from 'react';
import { FileUp, X } from 'lucide-react';
import { FileAttachment } from '../types';

interface FileUploadProps {
  attachments: FileAttachment[];
  onFileUpload: (files: FileList) => void;
  onRemoveFile: (id: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ attachments, onFileUpload, onRemoveFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
      <button
        onClick={handleClick}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
        title="Upload files"
      >
        <FileUp className="h-5 w-5" />
      </button>
      
      {attachments.length > 0 && (
        <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg p-2 min-w-[200px]">
          <p className="text-xs font-medium text-gray-500 mb-1 px-2">Attachments</p>
          <div className="max-h-[150px] overflow-y-auto">
            {attachments.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-2 truncate">
                  <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center">
                    <span className="text-xs text-indigo-600">{file.type.split('/')[1]?.toUpperCase().substring(0, 3) || 'FILE'}</span>
                  </div>
                  <span className="text-sm truncate max-w-[120px]">{file.name}</span>
                </div>
                <button 
                  onClick={() => onRemoveFile(file.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;