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
      image: "https://media.istockphoto.com/id/92056517/photo/african-beaded-necklace.jpg?s=612x612&w=0&k=20&c=QxYrpLtAwTFqlplSYh8yn8-6TQCJ01lV88_kVH3OBvI=",
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
      image: "https://media.istockphoto.com/id/115924875/photo/masai-attending-a-meeting-in-village-ngorongoro-conservationa-area-tanzania.jpg?s=612x612&w=0&k=20&c=8hDRy-JqGYfApeAB8qc2MLk7CF7GmU7F47u4t5bu8R8=",
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
      image: "https://media.istockphoto.com/id/466838052/photo/masai-mara-kenya-africa-shaman-with.jpg?s=612x612&w=0&k=20&c=AxxThmGDYCmO9BFBD4otkmO0Qr7y76nZ7PRuaTK483k=",
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
      image: "https://media.istockphoto.com/id/2229551613/photo/traditional-hand-crafted-carved-basket-kiondo-designs-texture-patterns.jpg?s=612x612&w=0&k=20&c=PWw_euiqmHCQN637fsS7rJ7lPUSo2jtHlqGYE8vn_Co=",
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
      image: "https://media.istockphoto.com/id/1210793417/photo/carved-marble-elephant-on-a-white-background.jpg?s=612x612&w=0&k=20&c=BQ1xvIV6IU1rAERREpVrlV-Uizu57aAqZY1f0azFg6M=",
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
      image: "https://media.istockphoto.com/id/115664683/photo/wooden-kitchen-utensils.jpg?s=612x612&w=0&k=20&c=1RbMAUqIyDy8ladza6T8DNDg0iwExVpt3iiqahPJH_A=",
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
      image: "https://media.istockphoto.com/id/606014940/photo/close-up-lots-of-colorful-variety-bracelets-of-handmade.jpg?s=612x612&w=0&k=20&c=hELMZ2Jh69H_KmSANc5p8PVK-wzhzkt1idzCmMf191w=",
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
      image: "https://media.istockphoto.com/id/95513248/photo/calabashes.jpg?s=612x612&w=0&k=20&c=QfCEqw7NuD0B12WwZEomsx9xhRpWd3b0NLD2NV3zz7s=",
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
      image: "https://media.istockphoto.com/id/1085052184/photo/tire-shoes.jpg?s=612x612&w=0&k=20&c=mO72zh-duI3B6n1s0b4bwKIqcCBBKIFGrHSjL4bxeQM=",
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
      image: "https://media.istockphoto.com/id/502948938/photo/tingatinga-paintings-in-tanzania.jpg?s=612x612&w=0&k=20&c=0vDDqu_WN8pauniyEMkLrhyVKDdX4qtjp9eFNK_ENRQ=",
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
      image: "https://media.istockphoto.com/id/1392692078/photo/dry-banana-leaf-artwork-background-with-circle-structure-wicker-placemat-background-round.jpg?s=612x612&w=0&k=20&c=oL4Gjx06oZN1v9hOJHioGJE4sai-rH-_sQi1pGJcBc4=",
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
      image: "https://media.istockphoto.com/id/1678375756/photo/leather-beige-sandals-birkenstocks-on-white-background-top-view-flat-lay-unisex-summer-shoes.jpg?s=612x612&w=0&k=20&c=yIdTQeR6xFPBGWNAx2h1LXh29ncH76pWRKia7A-Rrxg=",
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
      image: "https://media.istockphoto.com/id/471183498/photo/recycled-art-woman-with-umbrella.jpg?s=612x612&w=0&k=20&c=Ol70eT-Ekh2BoCeMMqmkx2IKXaWp-H6b1tdWT2CCBWQ=",
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
      image: "https://media.istockphoto.com/id/971603708/photo/coconut-monkey-souvenirs-sold-on-the-street.jpg?s=612x612&w=0&k=20&c=HnPYiCa_q3Qcoc2YqqwJwXZMiNLZDx3H2g74DE5SqdQ=",
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
      image: "https://media.istockphoto.com/id/90616365/photo/african-beaded-necklace.jpg?s=612x612&w=0&k=20&c=SoJXcoENVk6Xid2dMri6hfAFiheCvkvJdJEjwk0Jbns=",
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
      image: "https://media.istockphoto.com/id/184618627/photo/vintage-carved-wood-art-of-comedy-and-tragedy-theatre-masks.jpg?s=612x612&w=0&k=20&c=kRi2dqM3gvIY-XXyVyDYeSx3suJU_8ScqvAxMv6xxeU=",
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
      image: "https://media.istockphoto.com/id/1204181927/photo/jute-braided-home-spiral-rug-background-texture-pattern.jpg?s=612x612&w=0&k=20&c=bkEUx3ljzJWf8eub0d9jCfpo-AniJPY8bf1G6GpmPcw=",
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
      image: "https://media.istockphoto.com/id/96691593/photo/masai-blankets-in-kenya.jpg?s=612x612&w=0&k=20&c=IWNt2XLmzHzg4rC5kh5X45IwNOC8KWTJoQ9gJY9JIg4=",
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
      image: "https://media.istockphoto.com/id/120747323/photo/embroidery.jpg?s=612x612&w=0&k=20&c=cBAwGjRBzZw7cHoeHzJ0Sf33sdIYEK66aoqSDjCR-uA=",
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
      image: "https://media.istockphoto.com/id/162269815/photo/voodoo-dolls-at-the-fetish-market-in-lom%C3%A9-togo.jpg?s=612x612&w=0&k=20&c=earibHWji83ekKBGby9lLfncq3abJZEcsDrWQ1e7BGs=",
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
      image: "https://media.istockphoto.com/id/503861532/photo/wooden-soprano-flute-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=usfuu4EMTXyr5WRRbfb_FvE9zEekzI6em7-YlV15RL0=",
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
      image: "https://media.istockphoto.com/id/1254930648/photo/panamanian-drums.jpg?s=612x612&w=0&k=20&c=ONOt3W1vlUnll4WU2jgrPbHPeLS0Z0CIUCJdf3EilPI=",
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
      image: "https://media.istockphoto.com/id/2203383474/photo/handcrafted-beaded-belt-with-shells.jpg?s=612x612&w=0&k=20&c=s4PFZBBY93FdRaXpXxqvQ07QnmES1TllORmRCHp9L_8=",
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
      image: "https://media.istockphoto.com/id/695916244/photo/lots-of-handmade-tableware-ceramic-cups-plates-at-pottery-shop.jpg?s=612x612&w=0&k=20&c=rgbSxNuRH8SS-YCipKnW5KL12qeGngxas5ERvk6ozsk=",
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
      image: "https://media.istockphoto.com/id/1263010576/vector/seamless-panoramic-banner-for-the-day-of-the-dead-decorations-mexican-dia-de-muertos-papel.jpg?s=612x612&w=0&k=20&c=1smoAa8Jfl6B_MevDvZwzjkrGfhCrIVEl51bqDPAxsY=",
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
      image: "https://media.istockphoto.com/id/1922211519/photo/walking-sticks-part-of-the-mass-produced-hand-made-souvenirs-on-bazaar-market-stalls.jpg?s=612x612&w=0&k=20&c=zlHKCQdJ8Wb9TFjMYytc1b8Q2xtoZAp0ZXcYUcwQ7kk=",
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
      image: "https://media.istockphoto.com/id/95655137/photo/a-single-wooden-cello-on-a-white-background.jpg?s=612x612&w=0&k=20&c=XQbZ4jsZ228ISqYZoDcAiqK-bqpY9W71Wv5J94ZFK74=",
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
      image: "https://media.istockphoto.com/id/1271150418/photo/tribal-colorful-beads-bracelets-for-sale-for-tourists-at-the-street-market-in-kota-kinabalu.jpg?s=612x612&w=0&k=20&c=jxWqwZJ7Rhz0GPDKH7p5K0YKyJpZFOBIF_LQnvrbp5g=",
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
      image: "https://media.istockphoto.com/id/2185882236/photo/handmade-crocheted-bear-toys-stuffed-toy-amigurumi.jpg?s=612x612&w=0&k=20&c=Of_ExYmmbRfUdKdSLPYzFcDz4PBuaxqJFnpnt3N6_Sw=",
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
      image: "https://media.istockphoto.com/id/471183694/photo/metal-bird-near-its-nest.jpg?s=612x612&w=0&k=20&c=t7CUMyJJ12xFsssuhwha-0EsNfgJnMOKkq-2VlBkb9Q=",
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