// src/data/searchIndex.ts
import { getCollection } from 'astro:content';
import { wallpapers } from './wallpapers'; // Tu archivo existente de wallpapers

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'tool' | 'blog' | 'wallpaper';
  path: string;
  content: string;
}

export async function getDynamicSearchIndex(): Promise<SearchItem[]> {
  // 1. Herramientas: Escaneo 100% dinámico de la carpeta real src/pages/tools/
  const toolFiles = import.meta.glob('/src/pages/tools/**/*.{astro,ts,tsx}');
  const toolItems: SearchItem[] = Object.keys(toolFiles).map(filePath => {
    const relativePath = filePath
      .replace('/src/pages', '')
      .replace(/\.(astro|ts|tsx)$/, '')
      .replace(/\/index$/, '');
    
    const slug = relativePath.split('/').pop() || '';
    
    // Formatear el slug de forma legible si no se tiene título duro
    const formattedTitle = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Sinónimos automáticos basados en el slug técnico para asegurar aciertos (ej. ipv6, cidr, dns, etc.)
    const searchableTerms = slug.replace(/-/g, ' ');

    return {
      id: `tool-${slug}`,
      title: formattedTitle,
      description: `Utilidad técnica de infraestructura: ${formattedTitle}`,
      category: 'tool',
      path: relativePath,
      content: `${formattedTitle} ${searchableTerms} herramienta utilidad tool infraestructura`.toLowerCase()
    };
  });

  // 2. Colección 'recursos' (Artículos Markdown existentes)
  let recursoItems: SearchItem[] = [];
  try {
    const recursosEntries = await getCollection('recursos');
    if (recursosEntries && recursosEntries.length > 0) {
      recursoItems = recursosEntries.map(entry => {
        const rawBody = entry.body || '';
        const cleanContent = rawBody
          .replace(/```[\s\S]*?```/g, ' ')
          .replace(/[#*`_>\[\]()\-]/g, ' ')
          .replace(/\s+/g, ' ')
          .toLowerCase();

        const title = entry.data?.title || entry.id;
        const description = entry.data?.description || '';
        const category = entry.data?.category || 'Infraestructura TI';

        return {
          id: `recurso-${entry.id}`,
          title: title,
          description: description,
          category: 'blog',
          path: `/recursos/${entry.id}`,
          content: `${title} ${description} ${category} ${cleanContent}`.toLowerCase()
        };
      });
    }
  } catch (e) {
    console.error('[Veyxara Search] Error al leer la colección "recursos":', e);
  }

  // 3. Wallpapers dinámicos leídos directamente de tu archivo wallpapers.ts existente
  const wallpaperItems: SearchItem[] = wallpapers.map(wp => ({
    id: `wp-${wp.id}`,
    title: wp.title,
    description: `Wallpaper ${wp.category} (${wp.resolution}) - Veyxara Core`,
    category: 'wallpaper',
    path: wp.downloadUrl,
    content: `${wp.title} wallpaper fondo ${wp.category.toLowerCase()} ${wp.resolution} ${wp.id.replace(/-/g, ' ')}`.toLowerCase()
  }));

  return [...toolItems, ...recursoItems, ...wallpaperItems];
}