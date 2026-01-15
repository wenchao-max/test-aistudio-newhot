import React from 'react';
import { ThumbsUp, ThumbsDown, Send, X } from 'lucide-react';

interface FeedbackModalProps {
  onSubmit: (feedback: string) => void;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ onSubmit, onClose }) => {
  const [text, setText] = React.useState('');

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-600 rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-xl font-bold text-white mb-2">算法进化反馈</h3>
        <p className="text-slate-400 text-sm mb-4">
          请告诉我这组文案的效果或您的偏好，我将修正算法模型，在下一次生成中为您提供更精准的内容。
        </p>

        <textarea
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 text-sm h-24 focus:border-cyan-500 outline-none"
          placeholder="例如：稍微太夸张了，想要更平实一点的；或者：方案一很好，保持这种悬念感..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          <button 
             onClick={() => onSubmit(text || "用户觉得效果不错")}
             className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:brightness-110 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            提交并进化
          </button>
        </div>
      </div>
    </div>
  );
};