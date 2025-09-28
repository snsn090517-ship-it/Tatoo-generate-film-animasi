
export interface Character {
  id: string;
  name: string;
  description: string;
  defaultVoice: Voice;
}

export enum Voice {
  Anak = "suara anak-anak",
  Kakek = "suara kakek-kakek tua",
  Nenek = "suara nenek-nenek",
  WanitaDewasa = "suara wanita dewasa yang ramah dan tinggi",
  PriaDewasaBijak = "suara pria dewasa yang bijak dan humoris",
  WanitaRendah = "suara wanita dewasa yang rendah dan keibuan",
}

export interface ScenePreset {
  name: string;
  selectedCharacterIds: string[];
  characterVoices: Record<string, Voice>;
  characterCustomizations: Record<string, string>;
  musicStyle: string;
  cameraAngle: string;
  sceneDescription: string;
}