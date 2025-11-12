'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { API_ENDPOINTS } from '@/lib/api-config';

export default function CVUploader() {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string } | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifications côté client
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError('Type de fichier non autorisé. Seuls PDF, DOC et DOCX sont acceptés.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Fichier trop volumineux. Taille maximale: 5MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        setError('Vous devez être connecté pour uploader un CV');
        return;
      }

      console.log('Upload CV - File:', file.name, 'Size:', file.size);

      const response = await fetch(API_ENDPOINTS.upload, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log('Upload response:', data);

      if (!response.ok) {
        setError(data.error || 'Erreur lors de l\'upload');
        return;
      }

      setUploadedFile({
        name: data.fileName,
        url: data.fileUrl,
      });

      alert('✅ CV uploadé avec succès !');
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Erreur de connexion');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setError('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-white text-sm font-medium">CV / Portfolio</label>
        {uploadedFile && (
          <button
            onClick={handleRemoveFile}
            className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Supprimer
          </button>
        )}
      </div>

      {uploadedFile ? (
        <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <div className="flex-1">
            <p className="text-green-400 font-medium text-sm">Fichier uploadé</p>
            <p className="text-gray-400 text-xs">{uploadedFile.name}</p>
          </div>
          <a
            href={uploadedFile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm underline"
          >
            Voir
          </a>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            id="cv-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <label
            htmlFor="cv-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-all ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? (
              <>
                <div className="w-8 h-8 border-4 border-[#2563EB]/30 border-t-[#2563EB] rounded-full animate-spin mb-2"></div>
                <p className="text-gray-400 text-sm">Upload en cours...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-white text-sm font-medium">Cliquez pour uploader votre CV</p>
                <p className="text-gray-500 text-xs mt-1">PDF, DOC, DOCX (max 5MB)</p>
              </>
            )}
          </label>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
