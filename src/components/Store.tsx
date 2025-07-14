import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { storeCategories } from '@/data/storeData';
import { StoreItem } from '@/types/store';

const Store: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("effects");

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRarityName = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Обычный';
      case 'rare': return 'Редкий';
      case 'epic': return 'Эпический';
      case 'legendary': return 'Легендарный';
      default: return 'Обычный';
    }
  };

  const handlePurchase = (item: StoreItem) => {
    console.log('Покупка:', item);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Магазин украшений
        </h1>
        <p className="text-gray-600">
          Сделайте свои объявления более привлекательными с помощью эффектов, рамок и анимаций
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          {storeCategories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-2"
            >
              <Icon name={category.icon} size={16} />
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {storeCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <Card 
                  key={item.id} 
                  className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300"
                >
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getRarityColor(item.rarity)} border`}>
                      {getRarityName(item.rarity)}
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl">{item.preview}</div>
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl font-bold text-purple-600">
                            {item.price}
                          </span>
                          <span className="text-sm text-gray-500">{item.currency}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 text-sm">
                      {item.description}
                    </CardDescription>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={14} className="text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {item.isPermanent ? 'Навсегда' : `${item.duration} дней`}
                        </span>
                      </div>
                      {item.isOwned && (
                        <Badge className="bg-green-100 text-green-800">
                          Куплено
                        </Badge>
                      )}
                    </div>

                    <Button 
                      onClick={() => handlePurchase(item)}
                      disabled={item.isOwned}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                    >
                      {item.isOwned ? 'Куплено' : 'Купить'}
                    </Button>
                  </CardContent>

                  {item.gradient && (
                    <div 
                      className="absolute inset-0 opacity-5 pointer-events-none"
                      style={{ background: item.gradient }}
                    />
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Store;