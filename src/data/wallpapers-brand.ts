// src/data/wallpapers-brand.ts
export interface Wallpaper {
  id: string;
  title: string;
  category: string;
  resolution: string;
  aspectRatio: string;
  image: string;
  downloadUrl?: string;
}
export const wallpapers: Wallpaper[] = [
  {
    id: 'emblema-veyxara',
    title: 'Emblema Veyxara Portal Cibernético',
    category: 'Official Asset',
    resolution: '3840x2160 (4K)',
    aspectRatio: '16:9',
    image: '/wallpapers/emblema-veyxara.webp',
    downloadUrl: '',
  },
    {
    id: 'marca-espacial',
    title: 'Veyxara la X Espacial',
    category: 'Official Asset',
    resolution: '1080x1920 (FHD+)',
    aspectRatio: '9:16',
    image: '/wallpapers/marca-espacial.webp',
    downloadUrl: '',
  },
    {
    id: 'logo-nucleo-portal',
    title: 'Logo Portal Cubo Ci-fi',
    category: 'Official Asset',
    resolution: '3840x2160 (4K)',
    aspectRatio: '16:9',
    image: '/wallpapers/logo-nucleo-portal.webp',
    downloadUrl: '',
  },
    {
    id: 'logo-3d',
    title: 'logo-3d Ci-fi',
    category: 'Official Asset',
    resolution: '3840x2160 (4K)',
    aspectRatio: '16:9',
    image: '/wallpapers/logo-3d.webp',
    downloadUrl: '',
  },
    {
    id: 'logo-cosmico',
    title: 'Logo Cosmico',
    category: 'Official Asset',
    resolution: '3840x2160 (4K)',
    aspectRatio: '16:9',
    image: '/wallpapers/logo-cosmico.webp',
    downloadUrl: '',
  },
   {
    id: 'logo-el-futuro',
    title: 'Veyxara el futuro',
    category: 'Official Asset',
    resolution: '1080x1920 (FHD+)',
    aspectRatio: '9:16',
    image: '/wallpapers/logo-el-futuro.webp',
    downloadUrl: '',
  },
  {
    id: 'logo perspectiva',
    title: 'Logo perspectiva',
    category: 'Official Asset',
    resolution: '3840x2160 (4K)',
    aspectRatio: '16:9',
    image: '/wallpapers/logo perspectiva.webp',
    downloadUrl: '',
  },
];