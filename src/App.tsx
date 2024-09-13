import "./index.css";
import { PageHead } from "./layouts/PageHead";
import { CategoryTags } from "./components/CategoryTags";
import { categories } from "./data/home";
import { useState } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="flex max-h-screen flex-col">
      <PageHead />
      <div className="flex-grow-1 grid grid-cols-[auto,1fr] overflow-auto">
        <div>Sidebar</div>
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 z-10 bg-white pb-4">
            <CategoryTags
              onSelect={setSelectedCategory}
              selectedCategory={selectedCategory}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
