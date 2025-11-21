// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Search } from 'lucide-react';

const Products = () => {
  const [view, setView] = useState('grid');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  const selectedCategory = searchParams.get('category') || 'all';
  const [filteredProducts, setFilteredProducts] = useState([]);

  const realProducts = [
    {
      id: 1,
      name: "Maasai Beaded Bracelets",
      price: 25.99,
      image: "https://images.unsplash.com/photo-1582142306909-195724d1a6ee?w=400&h=400&fit=crop",
      category: "jewelry",
      artisan: "Maasai Women Co-op",
      origin: "Maasai Mara",
      materials: ["Glass beads", "Cowhide leather", "Brass"],
      description: "Handcrafted using fine glass beads on wire or soft cowhide leather with symbolic colors representing Maasai culture.",
      featured: true,
      stock: 50
    },
    {
      id: 2,
      name: "Maasai Shuka",
      price: 35.50,
      image: "https://images.unsplash.com/photo-1585487000115-33b64cffd1e9?w=400&h=400&fit=crop",
      category: "textiles",
      artisan: "Maasai Weavers",
      origin: "Narok",
      materials: ["Cotton-acrylic blend"],
      description: "Iconic red fabric with blue and white checkered patterns, used as wraps, blankets, or home decor.",
      featured: true,
      stock: 30
    },
    {
      id: 3,
      name: "Leso (Khanga)",
      price: 18.75,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "textiles",
      artisan: "Coastal Artisans",
      origin: "Mombasa",
      materials: ["100% Cotton"],
      description: "Lightweight rectangular printed cotton fabric featuring Swahili proverbs and vibrant patterns.",
      featured: false,
      stock: 100
    },
    {
      id: 4,
      name: "Kiondo Baskets",
      price: 42.00,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Kamba Weavers",
      origin: "Machakos",
      materials: ["Sisal fibers", "Natural dyes"],
      description: "Handwoven durable baskets made from natural sisal fibers, perfect for storage or fashion.",
      featured: true,
      stock: 25
    },
    {
      id: 5,
      name: "Soapstone Animal Carvings",
      price: 85.00,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "sculptures",
      artisan: "Kisii Stone Carvers",
      origin: "Kisii",
      materials: ["Soapstone"],
      description: "Exquisitely carved animal sculptures from locally sourced soapstone with smooth polished finish.",
      featured: true,
      stock: 15
    },
    {
      id: 6,
      name: "Wooden Utensils",
      price: 28.50,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Akamba Carvers",
      origin: "Machakos",
      materials: ["Wild olive wood"],
      description: "Hand-carved serving spoons and utensils showcasing natural wood grain variations.",
      featured: false,
      stock: 40
    },
    {
      id: 7,
      name: "Beaded Dog Collars",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      category: "pet-accessories",
      artisan: "Maasai Craftsmen",
      origin: "Narok",
      materials: ["Glass beads", "Cowhide leather", "Recycled brass"],
      description: "Traditional beadwork adapted for pet accessories, featuring durable leather and vibrant beads.",
      featured: false,
      stock: 35
    },
    {
      id: 8,
      name: "Calabash Gourds (Mbeve)",
      price: 22.75,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Coastal Artisans",
      origin: "Lamu",
      materials: ["Calabash", "Natural dyes"],
      description: "Dried and decorated gourds traditionally used as vessels, now beautiful decorative pieces.",
      featured: false,
      stock: 20
    },
    {
      id: 9,
      name: "Recycled Flip-Flop Animals",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "sculptures",
      artisan: "Ocean Sole Collective",
      origin: "Nairobi",
      materials: ["Recycled flip-flops"],
      description: "Colorful animal sculptures made from recycled beach flip-flops, promoting environmental conservation.",
      featured: true,
      stock: 28
    },
    {
      id: 10,
      name: "Tingatinga Paintings",
      price: 120.00,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "art",
      artisan: "Tingatinga Artists",
      origin: "Nairobi",
      materials: ["Canvas", "Oil paints"],
      description: "Vibrant, cartoonish depictions of African wildlife using the unique Tingatinga painting style.",
      featured: false,
      stock: 12
    },
    {
      id: 11,
      name: "Banana Fiber Crafts",
      price: 35.25,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Women's Cooperatives",
      origin: "Central Kenya",
      materials: ["Banana fibers"],
      description: "Eco-friendly ornaments and decorations made from dried and flattened banana leaves.",
      featured: false,
      stock: 45
    },
    {
      id: 12,
      name: "Akala (Leather Sandals)",
      price: 38.50,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      category: "footwear",
      artisan: "Traditional Cobblers",
      origin: "Various Regions",
      materials: ["Leather", "Recycled tire rubber"],
      description: "Traditional sandals with leather straps and durable recycled tire soles for longevity.",
      featured: false,
      stock: 30
    },
    {
      id: 13,
      name: "Wire Art Sculptures",
      price: 55.00,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "sculptures",
      artisan: "Wire Artists",
      origin: "Nairobi",
      materials: ["Recycled metal wire"],
      description: "Detailed animal and vehicle sculptures created by bending and twisting recycled wire.",
      featured: true,
      stock: 22
    },
    {
      id: 14,
      name: "Coconut Shell Crafts",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Coastal Artisans",
      origin: "Coastal Kenya",
      materials: ["Coconut shells"],
      description: "Beautiful bowls and decorative items crafted from polished coconut shells.",
      featured: false,
      stock: 60
    },
    {
      id: 15,
      name: "Maasai Beaded Necklaces",
      price: 65.00,
      image: "https://images.unsplash.com/photo-1582142306909-195724d1a6ee?w=400&h=400&fit=crop",
      category: "jewelry",
      artisan: "Maasai Women Co-op",
      origin: "Maasai Mara",
      materials: ["Glass beads", "Wire", "Leather"],
      description: "Large circular collar necklaces representing Maasai cultural identity and social status.",
      featured: true,
      stock: 18
    },
    {
      id: 16,
      name: "Wooden Masks",
      price: 75.50,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "art",
      artisan: "Various Tribal Artisans",
      origin: "Various Regions",
      materials: ["Local hardwoods"],
      description: "Ceremonial masks hand-carved from local woods representing spirits and ancestors.",
      featured: false,
      stock: 15
    },
    {
      id: 17,
      name: "Sisal Mats",
      price: 48.00,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Sisal Weavers",
      origin: "Eastern Kenya",
      materials: ["Natural sisal fibers"],
      description: "Durable floor coverings handwoven from fire-retardant natural sisal fibers.",
      featured: false,
      stock: 25
    },
    {
      id: 18,
      name: "Kikoy Fabric",
      price: 29.75,
      image: "https://images.unsplash.com/photo-1585487000115-33b64cffd1e9?w=400&h=400&fit=crop",
      category: "textiles",
      artisan: "Coastal Weavers",
      origin: "Mombasa",
      materials: ["100% Cotton"],
      description: "Traditional East African sarongs with vibrant yarn-dyed stripes and hand-tied tassels.",
      featured: false,
      stock: 80
    },
    {
      id: 19,
      name: "Embroidered Textiles",
      price: 52.00,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "textiles",
      artisan: "Embroidery Cooperatives",
      origin: "Various Regions",
      materials: ["Cotton fabric", "Embroidery thread"],
      description: "Fabric items featuring intricate hand-stitched embroidery with traditional storytelling motifs.",
      featured: false,
      stock: 35
    },
    {
      id: 20,
      name: "Bone Crafts",
      price: 41.25,
      image: "https://images.unsplash.com/photo-1582142306909-195724d1a6ee?w=400&h=400&fit=crop",
      category: "jewelry",
      artisan: "Bone Carvers",
      origin: "Various Regions",
      materials: ["Ethically sourced bone"],
      description: "Jewelry and figurines carved from ethically sourced animal bone with smooth finishes.",
      featured: false,
      stock: 28
    },
    {
      id: 21,
      name: "Horn Crafts",
      price: 67.00,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Horn Artisans",
      origin: "Rift Valley",
      materials: ["Polished animal horn"],
      description: "Decorative items and utensils crafted from polished animal horns revealing natural patterns.",
      featured: false,
      stock: 20
    },
    {
      id: 22,
      name: "Traditional Drums",
      price: 150.00,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "musical-instruments",
      artisan: "Drum Makers",
      origin: "Various Regions",
      materials: ["Wood", "Animal hide"],
      description: "Hand-carved wooden drums with stretched animal hide for authentic traditional sound.",
      featured: true,
      stock: 8
    },
    {
      id: 23,
      name: "Beaded Belts",
      price: 45.50,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      category: "accessories",
      artisan: "Maasai Craftsmen",
      origin: "Narok",
      materials: ["Leather", "Glass beads", "Metal buckle"],
      description: "Stylish leather belts adorned with vibrant traditional Maasai beadwork patterns.",
      featured: false,
      stock: 32
    },
    {
      id: 24,
      name: "Pottery (Clay Pots)",
      price: 38.00,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Pottery Communities",
      origin: "Western Kenya",
      materials: ["Local clay"],
      description: "Functional and decorative clay pots made using traditional coil-building techniques.",
      featured: false,
      stock: 40
    },
    {
      id: 25,
      name: "Handmade Paper Crafts",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "stationery",
      artisan: "Paper Craft Cooperatives",
      origin: "Nairobi",
      materials: ["Recycled paper", "Natural fibers"],
      description: "Eco-friendly paper and stationery made from recycled materials with natural fiber textures.",
      featured: false,
      stock: 75
    },
    {
      id: 26,
      name: "Carved Wooden Walking Sticks",
      price: 55.75,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "accessories",
      artisan: "Wood Carvers",
      origin: "Various Regions",
      materials: ["Hardwood"],
      description: "Sturdy walking sticks featuring detailed carvings of animal heads and geometric patterns.",
      featured: false,
      stock: 18
    },
    {
      id: 27,
      name: "Musical Instruments",
      price: 95.00,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "musical-instruments",
      artisan: "Instrument Makers",
      origin: "Various Regions",
      materials: ["Wood", "Gourds", "Natural materials"],
      description: "Traditional instruments like nyatiti and flutes crafted from natural local materials.",
      featured: false,
      stock: 12
    },
    {
      id: 28,
      name: "Beaded Coasters",
      price: 28.50,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "home-decor",
      artisan: "Beadwork Artisans",
      origin: "Nairobi",
      materials: ["Glass beads", "Felt backing"],
      description: "Colorful coasters meticulously made with glass beads and protective felt backing.",
      featured: false,
      stock: 50
    },
    {
      id: 29,
      name: "Fabric Dolls",
      price: 32.25,
      image: "https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=400&h=400&fit=crop",
      category: "toys",
      artisan: "Women's Cooperatives",
      origin: "Various Regions",
      materials: ["Fabric", "Stuffing"],
      description: "Soft-body dolls dressed in traditional Kenyan fabrics representing diverse cultures.",
      featured: false,
      stock: 35
    },
    {
      id: 30,
      name: "Recycled Metal Art Sculptures",
      price: 88.00,
      image: "https://images.unsplash.com/photo-1561731216-c53dee0c8e69?w=400&h=400&fit=crop",
      category: "sculptures",
      artisan: "Metal Artists",
      origin: "Nairobi",
      materials: ["Recycled scrap metal"],
      description: "Creative sculptures made by welding scrap metal into animal figures and abstract art.",
      featured: true,
      stock: 15
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'textiles', name: 'Textiles' },
    { id: 'home-decor', name: 'Home Decor' },
    { id: 'sculptures', name: 'Sculptures' },
    { id: 'art', name: 'Art' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'footwear', name: 'Footwear' },
    { id: 'musical-instruments', name: 'Musical Instruments' },
    { id: 'stationery', name: 'Stationery' },
    { id: 'toys', name: 'Toys' },
    { id: 'pet-accessories', name: 'Pet Accessories' }
  ];

  useEffect(() => {
    let results = realProducts;
    
    if (selectedCategory !== 'all') {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.artisan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.materials.some(material => 
          material.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    setFilteredProducts(results);
  }, [selectedCategory, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSearchParams(category === 'all' ? {} : { category });
  };

  const ProductCard = ({ product, view }) => (
    <div className={
      `bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200 ${
        view === 'list' ? 'flex' : ''
      }`
    }>
      <img
        src={product.image}
        alt={product.name}
        className={
          view === 'list' 
            ? "w-48 h-48 object-cover flex-shrink-0"
            : "w-full h-48 object-cover"
        }
      />
      <div className="p-4 flex-1">
        {product.featured && (
          <span className="bg-maasai-red text-white text-xs px-2 py-1 rounded-full mb-2 inline-block">
            Featured
          </span>
        )}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-charcoal">{product.name}</h3>
          <span className="text-kenyan-chocolate font-bold">${product.price}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">By {product.artisan}</p>
        <p className="text-xs text-maasai-red mb-2">From {product.origin}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs bg-kenyan-gold text-kenyan-brown px-2 py-1 rounded capitalize">
            {product.category.replace('-', ' ')}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{product.stock} in stock</span>
            <Link
              to={`/product/${product.id}`}
              className="bg-kenyan-brown text-white py-2 px-4 rounded-lg text-sm hover:bg-kenyan-chocolate transition duration-200"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Authentic Kenyan Crafts</h1>
          <p className="text-gray-600 mt-2">
            Discover 30+ handcrafted treasures from Kenyan artisans
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search crafts, materials, artisans..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-white border border-gray-300 text-charcoal placeholder-gray-500 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-kenyan-brown w-64"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Filters and View Options */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg border p-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <select 
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <span className="text-sm text-gray-600">
            {filteredProducts.length} products found
          </span>
        </div>
        
        <div className="flex bg-white rounded-lg border overflow-hidden">
          <button
            onClick={() => setView('grid')}
            className={`p-2 ${view === 'grid' ? 'bg-kenyan-brown text-white' : 'text-gray-600'}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 ${view === 'list' ? 'bg-kenyan-brown text-white' : 'text-gray-600'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={
        view === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "grid grid-cols-1 gap-6"
      }>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} view={view} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-cream rounded-lg p-8 max-w-md mx-auto">
            <p className="text-gray-600 text-lg mb-4">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                handleCategoryChange('all');
              }}
              className="bg-maasai-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
