import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ScrollText, BookOpen } from 'lucide-react';
import { folkCategories, folkItems, FolkCategoryType } from '../data/folkCultureData';

export function FolkCultureSection() {
  const [selectedCategory, setSelectedCategory] = useState<FolkCategoryType>('ca-dao');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const categoryItems = folkItems.filter((item) => item.categoryId === selectedCategory);
  const getCategoryItemCount = (type: FolkCategoryType) =>
    folkItems.filter((item) => item.categoryId === type).length;
  
  // Đảm bảo selectedItemId thuộc về category hiện tại
  const validSelectedItemId = selectedItemId && categoryItems.some(item => item.id === selectedItemId)
    ? selectedItemId
    : null;
  
  const selectedItem = validSelectedItemId
    ? categoryItems.find((item) => item.id === validSelectedItemId)
    : categoryItems[0] || null;

  const getCategoryIcon = (type: FolkCategoryType) => {
    switch (type) {
      case 'ca-dao':
        return ScrollText;
      case 'truyen-thuyet':
        return BookOpen;
      case 'le-hoi':
        return Calendar;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-3">
        <h3 className="text-xl font-bold text-amber-900 mb-1">
          Phật giáo & Văn hóa dân gian Việt Nam
        </h3>
        <p className="text-xs text-gray-600">
          Khám phá cách Phật giáo được thể hiện qua ca dao, truyền thuyết và lễ hội
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,320px)_1fr] gap-4">
        {/* Left: Category selector + Item list (2 phần Danh mục / Nội dung) */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Danh mục */}
            <div className="bg-white rounded-lg p-3 border border-amber-200 shadow-sm">
              <h4 className="text-sm font-semibold text-amber-900 mb-2">Danh mục</h4>
              <div className="space-y-1.5">
                {folkCategories.map((category) => {
                  const Icon = getCategoryIcon(category.type);
                  const isActive = selectedCategory === category.type;
                  const itemCount = getCategoryItemCount(category.type);

                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.type);
                        setSelectedItemId(null);
                      }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-medium transition-all ${
                        isActive
                          ? 'bg-amber-200 text-amber-900 border border-amber-500'
                          : 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-200'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                    <Icon className="size-4 flex-shrink-0 text-amber-700" />
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-amber-900 leading-snug whitespace-nowrap">
                        {category.title}
                      </span>
                      <span
                        className={`text-[11px] whitespace-nowrap ${
                          isActive ? 'text-amber-800' : 'text-gray-500'
                        }`}
                      >
                        {itemCount} mục
                      </span>
                    </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Nội dung */}
            {categoryItems.length > 0 && (
              <div className="bg-white rounded-lg p-3 border border-amber-200 shadow-sm">
                <h4 className="text-sm font-semibold text-amber-900 mb-2">Nội dung</h4>
                <div className="max-h-56 overflow-y-auto pr-1 space-y-1.5">
                  {categoryItems.map((item) => {
                    const isSelected =
                      validSelectedItemId === item.id ||
                      (!validSelectedItemId && item.id === categoryItems[0]?.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedItemId(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all leading-snug ${
                          isSelected
                            ? 'bg-amber-200 text-amber-900 border border-amber-500'
                            : 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-200'
                        }`}
                      >
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Content display */}
        <div>
          <AnimatePresence mode="wait">
            {selectedItem && (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm"
              >
                {/* Title */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="bg-amber-100 rounded-md p-2">
                    {React.createElement(getCategoryIcon(selectedCategory), {
                      className: 'size-5 text-amber-700',
                    })}
                  </div>
                  <h4 className="text-lg font-bold text-amber-900 leading-snug">{selectedItem.title}</h4>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500">
                    <div className="text-xs font-semibold text-amber-900 mb-1.5">
                      {selectedCategory === 'ca-dao' ? 'Ca dao' : selectedCategory === 'truyen-thuyet' ? 'Truyền thuyết' : 'Lễ hội'}
                    </div>
                    <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                      {selectedItem.content}
                    </div>
                  </div>

                  {/* Philosophical meaning */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="size-4 text-amber-700" />
                      <h5 className="text-base font-bold text-amber-900">Ý nghĩa triết học</h5>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">{selectedItem.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
