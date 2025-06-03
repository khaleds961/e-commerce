'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { useState, useEffect, useMemo } from 'react';
import { categoryData } from '../../../data/product';

interface MainMenuProps {
  siteProperties: any;
}

interface MenuItem {
  name: string;
  path?: string;
  subItems?: MenuItem[];
}

export default function MainMenu({ siteProperties }: MainMenuProps) {
  const { locale } = useParams();
  const pathname = usePathname();
  const [categories, setCategories] = useState<MenuItem[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Map categories to links with locale prefix
    const mappedCategories = categoryData.map(category => ({
      name: category.name,
      path: `/${locale}/template-2/categories/${category.slug}`,
    }));
    setCategories(mappedCategories);
  }, [locale]);

  const mainMenuItems = useMemo(() => [
    {
      title: 'Home',
      items: [
        { name: 'Home', path: `/${locale}/` },
        { name: 'Featured', path: `/${locale}/featured` },
      ],
    },
    {
      title: 'Shop',
      items: [
        { name: 'All Products', path: `/${locale}/products` },
        { name: 'Deals', path: `/${locale}/deals` },
        ...categories,
      ],
    },
    {
      title: 'Pages',
      items: [
        { name: 'About', path: `/${locale}/about` },
        { name: 'Contact', path: `/${locale}/contact-us` },
        { name: 'FAQ', path: `/${locale}/faq` },
      ],
    },
  ], [categories, locale]);

  const isActive = (path?: string) => {
    return path ? pathname.startsWith(path) : false;
  };

  return (
    <nav
      className={`hidden md:flex fixed z-40 w-full font-medium items-center justify-start gap-6 px-4 md:px-[130px] border-t border-b border-gray-200 transition-all duration-250 bg-white
      ${isScrolled ? 'top-0 shadow-sm' : 'top-[110px]'}`}
      aria-label="Main navigation"
    >
      <div className="border-x border-gray-300 h-full">
        <Dropdown
          title="All Categories"
          icon={<BiCategory />}
          items={categories}
          isActive={isActive(`/${locale}/template-2/categories`)}
        />
      </div>

      {mainMenuItems.map((item) => (
        <Dropdown
          key={item.title}
          title={item.title}
          items={item.items}
          isActive={item.items.some(subItem => isActive(subItem.path))}
        />
      ))}

      <Link
        href={`/${locale}/template-2/contact-us`}
        className="flex items-center gap-1 text-[#999] hover:text-black px-4 h-15"
        aria-current={pathname === `/${locale}/contact-us` ? 'page' : undefined}
      >
        Contact Us
      </Link>
    </nav>
  );
}

interface DropdownProps {
  title: string;
  icon?: React.ReactNode;
  items: MenuItem[];
  isActive?: boolean;
}

function Dropdown({
  title,
  icon,
  items,
  isActive = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`flex items-center gap-1 px-4  ${isActive ? 'text-black font-semibold' : 'text-[#999] hover:text-black'
          }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={`${title.toLowerCase().replace(/\s+/g, '-')}-dropdown`}
      >
        {icon}
        {title}
        <FaChevronDown
          className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
            }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={`${title.toLowerCase().replace(/\s+/g, '-')}-dropdown`}
        className={`absolute left-0 mt-2 min-w-[200px] bg-white rounded shadow-lg z-20 py-1 transition-all duration-700 ease-in-out
  ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
  `}
        role="menu"
      >
        {items.map((item, index) => (
          <div key={index} role="none">
            {item.subItems ? (
              <div className="group relative">
                <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  {item.name}
                </span>
                <ul className="absolute left-full top-0 ml-1 hidden group-hover:block bg-white shadow-lg rounded py-1 min-w-[200px] z-30">
                  {item.subItems.map((sub, subIdx) => (
                    <li key={subIdx}>
                      <Link
                        href={sub.path || '#'}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : item.path ? (
              <Link
                href={item.path}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {item.name}
              </Link>
            ) : (
              <span className="block px-4 py-2 text-gray-700">{item.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
