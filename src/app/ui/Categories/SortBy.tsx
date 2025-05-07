import { useTranslations } from "next-intl";


interface SortByProps {
    isOpen: boolean;
    setIsOpen: any;
    selectedOption: any;
    options: { value: string, label: any, icon: any }[];
    handleOptionClick: any;
    title: string;
    sort?: any;
    display?: any;
}

export default function SortBy({ isOpen, setIsOpen, selectedOption, options, handleOptionClick, title, sort, display }: SortByProps) {
    const t = useTranslations('HomePage');
    const currentOption = options.find(option => option.value === (title === 'sort_by' ? sort : display)) || options[0];

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="sorting" className="text-md text-gray-500">{t(title)}</label>
            <div className="relative inline-block">
                <div className="w-[200px]">
                    <button
                        type="button"
                        className="inline-flex justify-between w-full rounded-md border border-gray-300 
                    shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 "
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {currentOption.label}
                        <svg
                            className={`ml-2 w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                </div>

                {isOpen && (
                    <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
                        <ul className="max-h-60 rounded-md py-1 text-sm overflow-auto focus:outline-none">
                            {options.map((option) => (
                                <li
                                    key={option.value}
                                    className="w-[100%] flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.icon}
                                    <span className="mx-2">{option.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
