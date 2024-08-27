import React, { useState } from 'react';
import './ImageGen.css';
import Api from './api';
import download from '../Assets/download-icon-white-png-1.png';
import Image from 'next/image';

const ImageGen = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const generateImage = async () => {
    try {
        setLoading(true);
        if(prompt === ''){
            console.log('promt is null');
        }else{
            const response = await fetch(
                "https://api-inference.huggingface.co/models/prompthero/openjourney",
                {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${Api}`
                  },
                  body: JSON.stringify({ inputs: prompt }),
                }
              );
        
              if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
              }
            const blob = await response.blob();
            setImage(URL.createObjectURL(blob));
        }
    } catch (error) {
        console.error('Error generating image:', error);
    }finally {
        setLoading(false);
    }
  }

  const handleDownload = () => {
    if(image === null){
        console.log('image is null');
    }else{
        const link = document.createElement('a');
        link.href = image;
        link.download = 'imagepromt-ai.jpg'; 
        link.click();
    }
  };

  const genBtnStyle = {
    opacity: prompt ? 1 : 0.5,
    cursor: prompt ? 'pointer' : 'not-allowed',
  };

  const downBtnStyle = {
    opacity: image ? 1 : 0.5,
    cursor: image ? 'pointer' : 'not-allowed',
  };


  return (
    <div className='aiImage'>
      <div className="header">ImagePrompt<span> AI</span></div>
      <div className='imgArea'>
      <div className="genImage"><Image src={image} alt='' /></div>
      </div>
      <div className='search'>
        <div className='downBtn' style={downBtnStyle} onClick={handleDownload}><Image src={download} alt='' /></div>
        <input 
          type='text' 
          className='searchInput' 
          placeholder='Type your prompt...' 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className='genBtn' style={genBtnStyle} onClick={generateImage}>
        {loading ? 'Generating...' : 'Generate'}
        </div>
      </div>

      <div className='copyright'><a href="https://thrimaa.com/" target="blank">© Thrimaa Interactive Pvt. Ltd</a> | Developed by Vikum Chandrasekara</div>
      {/* <a href="https://thrimaa.com/" target="blank">Thrimaa Interactive Pvt. Ltd</a> */}
    </div>
  );
};

export default ImageGen;