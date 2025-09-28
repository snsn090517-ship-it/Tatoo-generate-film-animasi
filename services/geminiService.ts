
import { GoogleGenAI } from "@google/genai";
import { Character, Voice } from "../types";

interface PromptParams {
  characters: Character[];
  voices: Record<string, Voice>;
  customizations: Record<string, string>;
  music: string;
  camera: string;
  description: string;
}

interface GenerationParams extends PromptParams {
  apiKey: string;
}

const buildPrompt = ({ characters, voices, customizations, music, camera, description }: PromptParams): string => {
  const characterDescriptions = characters.map(char => {
    const customizationText = customizations[char.id] 
        ? ` Kustomisasi tambahan: ${customizations[char.id]}.` 
        : '';
    return `- ${char.name}: ${char.description}${customizationText} Suara yang diharapkan: ${voices[char.id]}.`
  }).join('\n');

  return `
    Buat sebuah adegan film animasi 3D sinematik berkualitas tinggi.

    **Latar Belakang Utama:**
    Sebuah desa kecil yang damai dan asri di tengah pegunungan dengan hutan rimba yang lebat di Indonesia. Suasananya sejuk dan alami.

    **Karakter dalam Adegan Ini:**
    ${characterDescriptions}

    **Deskripsi Adegan:**
    ${description}

    **Gaya Sinematik:**
    - Posisi Kamera: ${camera}.
    - Pencahayaan: Gunakan pencahayaan sinematik yang dramatis dan mendukung mood adegan.
    
    **Musik Latar:**
    ${music === 'Tanpa Musik' ? 'Tidak ada musik latar, hanya suara lingkungan alami.' : `Suasana musik latar harus seperti gaya musik "${music}".`}

    **Instruksi Tambahan:**
    - Hasilkan video berdurasi sekitar 1-3 menit yang terdiri dari beberapa shot/scene yang saling berhubungan sesuai deskripsi adegan.
    - Fokus pada ekspresi karakter dan interaksi yang hidup.
    - Kualitas visual harus setara dengan film animasi modern.
  `;
};

export const generateVideo = async (params: GenerationParams): Promise<string> => {
    const { apiKey, ...promptParams } = params;

    if (!apiKey) {
        throw new Error("API key is not provided.");
    }
    const ai = new GoogleGenAI({ apiKey });
  
    const prompt = buildPrompt(promptParams);
    console.log("Generated Prompt:", prompt);
  
    let operation = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
      },
    });
  
    console.log("Video generation started. Operation:", operation);
  
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
      console.log("Polling for video status...");
      operation = await ai.operations.getVideosOperation({ operation: operation });
      console.log("Current operation status:", operation.metadata?.state);
    }
  
    if (operation.error) {
        throw new Error(`Video generation failed: ${operation.error.message}`);
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  
    if (!downloadLink) {
      throw new Error("Video generation succeeded, but no download link was found.");
    }
  
    console.log("Fetching video from:", downloadLink);
    const videoResponse = await fetch(`${downloadLink}&key=${apiKey}`);
  
    if (!videoResponse.ok) {
      throw new Error(`Failed to download the generated video. Status: ${videoResponse.statusText}`);
    }
  
    const videoBlob = await videoResponse.blob();
    return URL.createObjectURL(videoBlob);
};