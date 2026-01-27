import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ScrollText, BookOpen } from 'lucide-react';
import { folkCategories, folkItems, FolkCategoryType } from '../data/folkCultureData';

export function FolkCultureSection() {
  const [selectedCategory, setSelectedCategory] = useState<FolkCategoryType>('ca-dao');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const categoryItems = folkItems.filter((item) => item.categoryId === selectedCategory);
  
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-amber-900 mb-2">
          Phật giáo & Văn hóa dân gian Việt Nam
        </h3>
        <p className="text-gray-600">
          Khám phá cách Phật giáo được thể hiện qua ca dao, truyền thuyết và lễ hội
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Category selector */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 rounded-xl p-4 shadow-lg">
            <h4 className="text-lg font-semibold text-amber-900 mb-4">Danh mục</h4>
            <div className="space-y-2">
              {folkCategories.map((category) => {
                const Icon = getCategoryIcon(category.type);
                const isActive = selectedCategory === category.type;
                const itemCount = categoryItems.length;

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.type);
                      setSelectedItemId(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left ${
                      isActive
                        ? 'bg-amber-200 text-amber-900 shadow-md border-2 border-amber-500'
                        : 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className={`size-5 flex-shrink-0 ${isActive ? 'text-amber-700' : 'text-amber-700'}`} />
                    <div className="flex-1">
                      <div className="font-semibold text-amber-900">{category.title}</div>
                      <div className={`text-xs ${isActive ? 'text-amber-700' : 'text-gray-500'}`}>
                        {itemCount} mục
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Item list */}
          {categoryItems.length > 0 && (
            <div className="mt-4 bg-white/80 rounded-xl p-4 shadow-lg">
              <h4 className="text-sm font-semibold text-amber-900 mb-3">Nội dung</h4>
              <div className="space-y-2">
                {categoryItems.map((item) => {
                  const isSelected = validSelectedItemId === item.id || (!validSelectedItemId && item.id === categoryItems[0]?.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        isSelected
                          ? 'bg-amber-200 text-amber-900 shadow-md border-2 border-amber-500'
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

        {/* Right: Content display */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedItem && (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 rounded-xl p-6 shadow-lg"
              >
                {/* Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-amber-100 rounded-lg p-2">
                    {React.createElement(getCategoryIcon(selectedCategory), {
                      className: 'size-6 text-amber-700',
                    })}
                  </div>
                  <h4 className="text-xl font-bold text-amber-900">{selectedItem.title}</h4>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                    <div className="text-sm font-semibold text-amber-900 mb-2">
                      {selectedCategory === 'ca-dao' ? 'Ca dao' : selectedCategory === 'truyen-thuyet' ? 'Truyền thuyết' : 'Lễ hội'}
                    </div>
                    <div className="text-gray-800 whitespace-pre-line leading-relaxed">
                      {selectedItem.content}
                    </div>
                  </div>

                  {/* Philosophical meaning */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="size-5 text-amber-700" />
                      <h5 className="text-lg font-bold text-amber-900">Ý nghĩa triết học</h5>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{selectedItem.explanation}</p>
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
