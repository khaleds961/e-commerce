import { Inter, Roboto, Open_Sans, Poppins } from 'next/font/google';

// Call font loaders at module scope
const interFont = Inter({ subsets: ['latin'] });
const robotoFont = Roboto({ weight: ['400', '700'], subsets: ['latin'] });
const openSansFont = Open_Sans({ subsets: ['latin'] });
const poppinsFont = Poppins({ weight: ['400', '500', '700'], subsets: ['latin'] });

// Then use the constants in your map
export const fontMap = {
    'Inter': interFont,
    'Roboto': robotoFont,
    'Open Sans': openSansFont,
    'Poppins': poppinsFont
}