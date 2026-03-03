import {
  Smartphone,
  Shirt,
  Sofa,
  Sparkles,
  BookOpen,
  Gamepad2,
  Grid,
} from "lucide-react";

interface Props {
  selected: string;
  setSelected: (value: string) => void;
}

const categories = [
  { name: "All", icon: Grid },
  { name: "Electronics", icon: Smartphone },
  { name: "Fashion", icon: Shirt },
  { name: "Home & Furniture", icon: Sofa },
  { name: "Beauty & Personal Care", icon: Sparkles },
  { name: "Books & Education", icon: BookOpen },
  { name: "Gaming", icon: Gamepad2 },
];

const CategoryBar: React.FC<Props> = ({ selected, setSelected }) => {
  return (
    <div className="bg-[#232f3e] text-white flex overflow-x-auto px-4 py-3 gap-6 sticky top-16 z-40">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <div
            key={cat.name}
            onClick={() => setSelected(cat.name)}
            className={`flex items-center gap-2 cursor-pointer whitespace-nowrap transition
            ${selected === cat.name ? "text-yellow-400" : "hover:text-yellow-300"}`}
          >
            <Icon size={20} />
            <span>{cat.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBar;
