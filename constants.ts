
import { Character, Voice } from './types';

export const CHARACTERS: Character[] = [
  {
    id: 'iako',
    name: 'Iako',
    description: 'Anak kecil berusia 4 tahun, berkulit sawo matang, rambut tipis, hanya memakai celana pendek warna merah, tidak memakai baju, tubuh gemuk berisi.',
    defaultVoice: Voice.Anak
  },
  {
    id: 'iopatua',
    name: 'Iopatua',
    description: 'Kakek Iako, berusia 60 tahun. Pakai sarung khas Indonesia yang di gulung sampai pinggang, baju kaos warna hijau, kepala botak, kulit keriput.',
    defaultVoice: Voice.Kakek
  },
  {
    id: 'iomatua',
    name: 'Iomatua',
    description: 'Nenek Iako, berusia 50 tahun. Pakai baju kemeja wanita khas Indonesia jaman dahulu berwarna kuning, memakai sanggul di kepala, rambut putih panjang yang di ikat pada sanggul.',
    defaultVoice: Voice.Nenek
  },
  {
    id: 'nike',
    name: 'Nike',
    description: 'Bibi Iako, wanita berusia 29 tahun. Rambut panjang terurai, wajah cantik.',
    defaultVoice: Voice.WanitaDewasa
  },
  {
    id: 'ndege',
    name: 'Ndege',
    description: 'Bapak Iako, pria dewasa berusia 40 tahun. Tubuh agak pendek dan kekar, humoris, suka pakai blangkon Jawa, memakai baju kaos warna hitam, celana jeans usang pendek.',
    defaultVoice: Voice.PriaDewasaBijak
  },
  {
    id: 'aslina',
    name: 'Aslina',
    description: 'Ibu Iako, wanita dewasa berusia 40 tahun. Pakai baju kaos biru, celana panjang wanita.',
    defaultVoice: Voice.WanitaRendah
  }
];

export const VOICE_OPTIONS: Voice[] = Object.values(Voice);

export const MUSIC_STYLES: string[] = [
  'Tanpa Musik',
  'Orkestra Sinematik',
  'Gamelan Jawa yang Menenangkan',
  'Akustik Ceria',
  'Suara Hutan Alami',
  'Musik Petualangan Epik',
  'Melodi Sedih dan Emosional'
];

export const CAMERA_ANGLES: string[] = [
  'Wide Shot (menunjukkan seluruh lingkungan)',
  'Medium Shot (dari pinggang ke atas)',
  'Close-up (fokus pada wajah)',
  'Drone Shot (dari atas)',
  'First-person View (dari mata karakter)',
  'Tracking Shot (mengikuti pergerakan karakter)'
];

export const LOADING_MESSAGES: string[] = [
    "Membangun dunia desa di pegunungan...",
    "Memanggil para karakter untuk beraksi...",
    "Menyiapkan kamera dan pencahayaan...",
    "AI sedang merangkai adegan demi adegan...",
    "Menambahkan sentuhan magis sinematik...",
    "Proses render video sedang berlangsung, ini mungkin butuh beberapa menit...",
    "Menyusun piksel menjadi sebuah mahakarya...",
    "Hampir selesai, video Anda akan segera siap!"
];
