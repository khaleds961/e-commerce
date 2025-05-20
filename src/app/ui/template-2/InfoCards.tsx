'use client';
import { Car, Heart, CreditCard, Chats} from 'phosphor-react';

const cards = [
  {
    id: 1,
    icon: <Car size={40} weight="fill" className="text-white" />,
    title: 'Free Shipping',
    description: 'Free shipping all over the US',
    bgColor: 'bg-[#359FC1]',
  },
  {
    id: 2,
    icon: <Heart size={40} weight="fill" className="text-white" />,
    title: '100% Satisfaction',
    description: 'Free shipping all over the US',
    bgColor: 'bg-[#359FC1]',
  },
  {
    id: 3,
    icon: <CreditCard size={40} weight="fill" className="text-white" />,
    title: 'Secure Payments',
    description: 'Free shipping all over the US',
    bgColor: 'bg-[#359FC1]',
  },
  {
    id: 4,
    icon: <Chats size={40} weight="fill" className="text-white" />,
    title: '24/7 Support',
    description: 'Free shipping all over the US',
    bgColor: 'bg-[#359FC1]',
  },
];

export default function InfoCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8 px-4">
  {cards.map(card => (
    <div
      key={card.id}
      className={`flex items-start gap-4 p-6 rounded-4xl shadow ${card.bgColor} transition duration-300 hover:brightness-110`}
    >
      <div className="shrink-0 bg-[#1f52cc] rounded-full p-1">
        {card.icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{card.title}</h3>
        <p className="text-sm text-white mt-1">{card.description}</p>
      </div>
    </div>
  ))}
</section>
  );
}