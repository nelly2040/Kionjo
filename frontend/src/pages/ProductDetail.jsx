// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // All 30 products with detailed information and both images
  const products = {
    1: {
      id: 1,
      name: "Maasai Beaded Bracelets",
      price: 25.99,
      images: [
        "https://media.istockphoto.com/id/92056517/photo/african-beaded-necklace.jpg?s=612x612&w=0&k=20&c=QxYrpLtAwTFqlplSYh8yn8-6TQCJ01lV88_kVH3OBvI=",
        "https://media.istockphoto.com/id/502643403/photo/beaded-bracelets-of-masai-warrior-close-up.jpg?s=612x612&w=0&k=20&c=3EYl-KVTef75VY1ac2DRefh4jGK90MYDSi2YC_MYZIQ="
      ],
      category: "jewelry",
      artisan: {
        name: "Maasai Women Cooperative",
        location: "Maasai Mara",
        story: "For generations, Maasai women have perfected the art of beadwork, creating vibrant jewelry that tells stories of their culture, status, and heritage. Each bead is carefully selected and hand-strung using traditional techniques passed down through families.",
        yearsExperience: 15
      },
      origin: "Maasai Mara",
      materials: ["Glass beads", "Cowhide leather", "Brass fittings"],
      description: "Handcrafted using fine glass beads on wire or soft cowhide leather, often fastened with a wire hook or brass buckle. The colors are highly symbolic within Maasai culture, indicating social status or age. They are lightweight, durable, and often waterproof depending on the specific materials used.",
      dimensions: "Adjustable length: 15-20cm, Width: 2-3cm",
      careInstructions: "Wipe clean with dry cloth. Avoid exposure to water and chemicals.",
      stock: 50,
      featured: true
    },
    2: {
      id: 2,
      name: "Maasai Shuka",
      price: 35.50,
      images: [
        "https://media.istockphoto.com/id/115924875/photo/masai-attending-a-meeting-in-village-ngorongoro-conservationa-area-tanzania.jpg?s=612x612&w=0&k=20&c=8hDRy-JqGYfApeAB8qc2MLk7CF7GmU7F47u4t5bu8R8=",
        "https://media.istockphoto.com/id/1196344800/photo/maasai-warriors-arriving-at-a-scene-in-a-ceremonial-slow-walk.jpg?s=612x612&w=0&k=20&c=_3Hcm6A3QT3ga61R8X8vWQjJW8Jk7_CiQUVt5nloVWY="
      ],
      category: "textiles",
      artisan: {
        name: "Maasai Weavers Collective",
        location: "Narok County",
        story: "The Maasai Shuka represents more than just fabric - it's a symbol of Maasai identity and resilience. Woven using techniques that have been preserved for centuries, each Shuka tells a story of the Kenyan savannah and its people.",
        yearsExperience: 20
      },
      origin: "Narok",
      materials: ["Cotton-acrylic blend"],
      description: "The iconic red fabric with blue and white (or other color combinations) checkered or striped patterns. It's a heavy, soft, yet durable blend, typically a cotton-acrylic mix (or 100% acrylic). They measure approximately 1.5m by 2m and are used as wraps, blankets, or home decor.",
      dimensions: "150cm x 200cm",
      careInstructions: "Machine wash cold, gentle cycle. Tumble dry low. Do not bleach.",
      stock: 30,
      featured: true
    },
    3: {
      id: 3,
      name: "Leso (Khanga)",
      price: 18.75,
      images: [
        "https://media.istockphoto.com/id/466838052/photo/masai-mara-kenya-africa-shaman-with.jpg?s=612x612&w=0&k=20&c=AxxThmGDYCmO9BFBD4otkmO0Qr7y76nZ7PRuaTK483k=",
        "https://media.istockphoto.com/id/1193737053/photo/maasai-woman-in-traditional-clothing.jpg?s=612x612&w=0&k=20&c=g6u7hnX_6DgFS5vdd8YJQNJccuRvFIfImZu4JhybiTQ="
      ],
      category: "textiles",
      artisan: {
        name: "Coastal Textile Artisans",
        location: "Mombasa",
        story: "Coastal artisans have been creating Kanga fabrics for over a century, blending Swahili culture with vibrant designs. Each piece carries messages of wisdom, love, and community through its printed proverbs.",
        yearsExperience: 12
      },
      origin: "Mombasa",
      materials: ["100% Cotton"],
      description: "A lightweight, rectangular printed cotton fabric, typically measuring about 1.5m by 1m. Key features include a distinct border (pindo), a central motif (mji), and a Swahili proverb (jina). They are sold in pairs and are versatile for use as clothing, baby carriers, or home textiles.",
      dimensions: "150cm x 100cm (sold in pairs)",
      careInstructions: "Hand wash in cold water. Line dry. Iron on medium heat.",
      stock: 100,
      featured: false
    },
    4: {
      id: 4,
      name: "Kiondo Baskets",
      price: 42.00,
      images: [
        "https://media.istockphoto.com/id/2229551613/photo/traditional-hand-crafted-carved-basket-kiondo-designs-texture-patterns.jpg?s=612x612&w=0&k=20&c=PWw_euiqmHCQN637fsS7rJ7lPUSo2jtHlqGYE8vn_Co=",
        "https://media.istockphoto.com/id/2229551607/photo/traditional-hand-crafted-carved-basket-kiondo-designs-texture-patterns.jpg?s=612x612&w=0&k=20&c=ITLcFDJQyvoQ0tKiSzZodX0KZ84t9ggn9ZsmjiXEkZQ="
      ],
      category: "home-decor",
      artisan: {
        name: "Kamba Weavers Group",
        location: "Machakos",
        story: "Kamba weavers have transformed traditional basket-making into a sustainable livelihood. Using sisal fibers from their local environment, they create functional art that supports their families while preserving cultural heritage.",
        yearsExperience: 8
      },
      origin: "Machakos",
      materials: ["Sisal fibers", "Natural dyes", "Leather handles"],
      description: "Handwoven, durable baskets primarily made from natural sisal fibers, though modern versions may incorporate wool or upcycled plastic. The fibers are extracted from sisal leaves, dried, dyed with natural pigments, and meticulously woven. They are sturdy, functional items used for storage or as fashion bags, often finished with leather handles.",
      dimensions: "Height: 25cm, Diameter: 30cm",
      careInstructions: "Spot clean with damp cloth. Keep away from direct sunlight and moisture.",
      stock: 25,
      featured: true
    },
    5: {
      id: 5,
      name: "Soapstone Animal Carvings",
      price: 85.00,
      images: [
        "https://media.istockphoto.com/id/1210793417/photo/carved-marble-elephant-on-a-white-background.jpg?s=612x612&w=0&k=20&c=BQ1xvIV6IU1rAERREpVrlV-Uizu57aAqZY1f0azFg6M=",
        "https://media.istockphoto.com/id/824126010/photo/tigereye.jpg?s=612x612&w=0&k=20&c=hefettZcST5G_pdMwb84dOs6nURyUNF9b5vohTgSnC0="
      ],
      category: "sculptures",
      artisan: {
        name: "Kisii Stone Carvers Union",
        location: "Kisii County",
        story: "For generations, Kisii families have worked with soapstone, transforming rough stones into exquisite sculptures. The craft has been passed down through families, with each carver developing their unique style while honoring traditional techniques.",
        yearsExperience: 25
      },
      origin: "Kisii",
      materials: ["Soapstone (serpentine stone)"],
      description: "Sculptures carved from locally sourced soapstone (serpentine stone) in Kisii County. They are known for their smooth finish, achieved through carving, sanding, and polishing. They come in various natural colors (cream, pink, gray, black) and depict safari animals or abstract shapes.",
      dimensions: "Varies by animal: 15-30cm height",
      careInstructions: "Dust with soft cloth. Avoid dropping or exposure to harsh chemicals.",
      stock: 15,
      featured: true
    },
    6: {
      id: 6,
      name: "Wooden Utensils",
      price: 28.50,
      images: [
        "https://media.istockphoto.com/id/115664683/photo/wooden-kitchen-utensils.jpg?s=612x612&w=0&k=20&c=1RbMAUqIyDy8ladza6T8DNDg0iwExVpt3iiqahPJH_A=",
        "https://media.istockphoto.com/id/1459413302/photo/wooden-kitchen-utensils-on-white-background-knolling-concept.jpg?s=612x612&w=0&k=20&c=-qt6umfp44l3GSW0NOBv9CKmIigEgXZ_u2WV9hZSJJ0="
      ],
      category: "home-decor",
      artisan: {
        name: "Akamba Carvers Collective",
        location: "Machakos",
        story: "Akamba carvers have been creating wooden utensils for generations, using sustainable harvesting practices and traditional carving techniques that highlight the natural beauty of Kenyan hardwoods.",
        yearsExperience: 18
      },
      origin: "Machakos",
      materials: ["Wild olive wood", "Mahogany"],
      description: "Hand-carved items like serving spoons, forks, and bowls made from local hardwoods such as wild olive wood or mahogany. Each piece is unique due to natural variations in the wood grain and coloration, and they are typically hand-washed and oiled to maintain their finish.",
      dimensions: "Spoons: 20-25cm length, Bowls: 15-20cm diameter",
      careInstructions: "Hand wash only. Oil periodically with food-safe mineral oil.",
      stock: 40,
      featured: false
    },
    7: {
      id: 7,
      name: "Beaded Dog Collars",
      price: 32.99,
      images: [
        "https://media.istockphoto.com/id/606014940/photo/close-up-lots-of-colorful-variety-bracelets-of-handmade.jpg?s=612x612&w=0&k=20&c=hELMZ2Jh69H_KmSANc5p8PVK-wzhzkt1idzCmMf191w=",
        "https://media.istockphoto.com/id/2204761671/photo/greylag-anatolian-shepherd-dog-cropped-ears-and-beaded-collar.jpg?s=612x612&w=0&k=20&c=b49XH-uNmQNp9KubZzN8b6goNnYVPX0dVz9Tc4yFwIw="
      ],
      category: "pet-accessories",
      artisan: {
        name: "Maasai Craftsmen Group",
        location: "Narok",
        story: "Maasai artisans have adapted their traditional beadwork skills to create beautiful and functional accessories for pets, combining cultural heritage with modern pet care needs.",
        yearsExperience: 10
      },
      origin: "Narok",
      materials: ["Glass beads", "Cowhide leather", "Recycled brass buckles"],
      description: "A modern application of traditional beadwork, featuring 100% glass beads hand-stitched onto robust cowhide leather and lined with soft goatskin. They use sturdy, hand-cast recycled brass buckles and D-rings.",
      dimensions: "Adjustable: 30-45cm length, 2.5cm width",
      careInstructions: "Wipe clean with damp cloth. Remove before swimming or bathing.",
      stock: 35,
      featured: false
    },
    8: {
      id: 8,
      name: "Calabash Gourds (Mbeve)",
      price: 22.75,
      images: [
        "https://media.istockphoto.com/id/95513248/photo/calabashes.jpg?s=612x612&w=0&k=20&c=QfCEqw7NuD0B12WwZEomsx9xhRpWd3b0NLD2NV3zz7s=",
        "https://media.istockphoto.com/id/2205484771/photo/calabash-drying-to-make-instruments-and-bowls.jpg?s=612x612&w=0&k=20&c=C2XjL5uqVxS7AlXDBwSbnpznevsGVeJe3TFQzaBnSyE="
      ],
      category: "home-decor",
      artisan: {
        name: "Coastal Calabash Artisans",
        location: "Lamu Archipelago",
        story: "For centuries, coastal communities have cultivated and crafted calabash gourds into functional art. Each gourd is naturally grown, harvested at perfect maturity, and meticulously cleaned and decorated by skilled artisans.",
        yearsExperience: 30
      },
      origin: "Lamu",
      materials: ["Calabash gourd", "Natural dyes", "Wire wrapping"],
      description: "Dried and hollowed-out gourds from the calabash plant, used traditionally as vessels for carrying milk or water. They are often decorated with intricate patterns, wire wrapping, or beadwork. Each piece is unique with its own natural shape and texture.",
      dimensions: "Varies: 15-25cm diameter",
      careInstructions: "Wipe with dry cloth. Avoid prolonged exposure to moisture. Store in dry place.",
      stock: 20,
      featured: false
    },
    9: {
      id: 9,
      name: "Recycled Flip-Flop Animals",
      price: 45.00,
      images: [
        "https://media.istockphoto.com/id/1085052184/photo/tire-shoes.jpg?s=612x612&w=0&k=20&c=mO72zh-duI3B6n1s0b4bwKIqcCBBKIFGrHSjL4bxeQM=",
        "https://media.istockphoto.com/id/1214365758/photo/tourist-souvenir-markets-in-bali-crafts-and-rattan-and-wood-close-up.jpg?s=612x612&w=0&k=20&c=Hx23cqjZykA3ewU7cH8eXouB4ElMErdjp0emnqS5r7k="
      ],
      category: "sculptures",
      artisan: {
        name: "Ocean Sole Collective",
        location: "Nairobi",
        story: "Founded to clean Kenya's beaches and waterways, Ocean Sole transforms washed-up flip-flops into vibrant art while providing employment to local communities and raising awareness about marine conservation.",
        yearsExperience: 15
      },
      origin: "Nairobi",
      materials: ["Recycled flip-flops", "Non-toxic adhesives"],
      description: "Sculptures created by artisans who collect discarded flip-flops from beaches, clean, cut, and glue them into vibrant animal shapes (elephants, giraffes, etc.). This craft promotes environmental conservation and the resulting products are colorful and unique.",
      dimensions: "Small: 10-15cm, Medium: 20-25cm, Large: 30-40cm",
      careInstructions: "Dust gently with soft brush. Keep away from direct sunlight and heat.",
      stock: 28,
      featured: true
    },
    10: {
      id: 10,
      name: "Tingatinga Paintings",
      price: 120.00,
      images: [
        "https://media.istockphoto.com/id/502948938/photo/tingatinga-paintings-in-tanzania.jpg?s=612x612&w=0&k=20&c=0vDDqu_WN8pauniyEMkLrhyVKDdX4qtjp9eFNK_ENRQ=",
        "https://media.istockphoto.com/id/475151574/photo/tinga-tinga-paintings-in-tanzania.jpg?s=612x612&w=0&k=20&c=-46a2_9kwynqlBhtlv1QTL9vtTS80-MP9aBLHyYIaT8="
      ],
      category: "art",
      artisan: {
        name: "Tingatinga Artists Cooperative",
        location: "Nairobi",
        story: "Inspired by the Tanzanian Tingatinga style, Kenyan artists have developed their own vibrant interpretation featuring African wildlife and village scenes with bold colors and imaginative compositions.",
        yearsExperience: 8
      },
      origin: "Nairobi",
      materials: ["Canvas", "Oil paints", "Wooden frame"],
      description: "A style of painting that originated in Tanzania but is popular in Kenya. They feature colorful, often cartoonish, depictions of African wildlife or village scenes using oil paints on canvas, known for their flattened perspective and bold colors.",
      dimensions: "40cm x 50cm (standard), 50cm x 70cm (large)",
      careInstructions: "Dust frame lightly. Avoid direct sunlight. Professional cleaning recommended.",
      stock: 12,
      featured: false
    },
    11: {
      id: 11,
      name: "Banana Fiber Crafts",
      price: 35.25,
      images: [
        "https://media.istockphoto.com/id/1392692078/photo/dry-banana-leaf-artwork-background-with-circle-structure-wicker-placemat-background-round.jpg?s=612x612&w=0&k=20&c=oL4Gjx06oZN1v9hOJHioGJE4sai-rH-_sQi1pGJcBc4=",
        "https://media.istockphoto.com/id/1939358353/photo/recycled-paper.jpg?s=612x612&w=0&k=20&c=dOYlBLM_bxovponZtS-8eaC0MmqWIaGEM8RDtNQKkCw="
      ],
      category: "home-decor",
      artisan: {
        name: "Women's Banana Fiber Cooperative",
        location: "Central Kenya",
        story: "Rural women's groups have developed sustainable livelihoods by transforming agricultural waste into beautiful crafts, using banana fibers that would otherwise be discarded after harvest.",
        yearsExperience: 6
      },
      origin: "Central Kenya",
      materials: ["Banana fibers", "Natural adhesives"],
      description: "Ornaments, figures, placemats, or wall hangings made from dried and flattened banana leaves/fibers. The natural fibers are cut, shaped, and glued or stitched together to form various decorative items.",
      dimensions: "Placemats: 30x45cm, Ornaments: 10-15cm",
      careInstructions: "Wipe with slightly damp cloth. Avoid soaking in water.",
      stock: 45,
      featured: false
    },
    12: {
      id: 12,
      name: "Akala (Leather Sandals)",
      price: 38.50,
      images: [
        "https://media.istockphoto.com/id/1678375756/photo/leather-beige-sandals-birkenstocks-on-white-background-top-view-flat-lay-unisex-summer-shoes.jpg?s=612x612&w=0&k=20&c=yIdTQeR6xFPBGWNAx2h1LXh29ncH76pWRKia7A-Rrxg=",
        "https://media.istockphoto.com/id/90632152/photo/my-new-sandals.jpg?s=612x612&w=0&k=20&c=gIKmlN8gwYvsAt1AXee2YRN7cueRhxpQUi28EuQIi18="
      ],
      category: "footwear",
      artisan: {
        name: "Traditional Cobblers Union",
        location: "Various Regions",
        story: "Master cobblers continue centuries-old traditions of leatherworking, combining time-tested techniques with sustainable practices to create footwear that lasts for years.",
        yearsExperience: 25
      },
      origin: "Various Regions",
      materials: ["Leather", "Recycled tire rubber", "Brass fittings"],
      description: "Traditional sandals made from high-quality leather for the straps and footbed, often utilizing recycled car or truck tire rubber for the durable soles. They are known for their longevity and simple, practical design.",
      dimensions: "Available in full and half sizes: 5-12",
      careInstructions: "Condition leather periodically. Avoid excessive water exposure.",
      stock: 30,
      featured: false
    },
    13: {
      id: 13,
      name: "Wire Art Sculptures",
      price: 55.00,
      images: [
        "https://media.istockphoto.com/id/471183498/photo/recycled-art-woman-with-umbrella.jpg?s=612x612&w=0&k=20&c=Ol70eT-Ekh2BoCeMMqmkx2IKXaWp-H6b1tdWT2CCBWQ=",
        "https://media.istockphoto.com/id/995397204/photo/creative-figures-of-musicians-violinists-are-playing-violins-play-living-l.jpg?s=612x612&w=0&k=20&c=viMGndoxjx0uoAYTohR9jxVDl0ScDJ5QlmcjC5Qx0fo="
      ],
      category: "sculptures",
      artisan: {
        name: "Wire Artists Collective",
        location: "Nairobi",
        story: "Self-taught artists developed this unique art form using readily available materials, creating intricate sculptures that showcase incredible creativity and technical skill with simple wire.",
        yearsExperience: 12
      },
      origin: "Nairobi",
      materials: ["Recycled metal wire", "Pliers for shaping"],
      description: "Figurines of animals, vehicles (cars, bicycles), or abstract art created by bending and twisting recycled metal wire. This craft often uses simple tools to produce detailed and expressive three-dimensional objects.",
      dimensions: "Small: 15-20cm, Medium: 25-35cm, Large: 40-50cm",
      careInstructions: "Dust gently with soft cloth. Handle with care to maintain shape.",
      stock: 22,
      featured: true
    },
    14: {
      id: 14,
      name: "Coconut Shell Crafts",
      price: 19.99,
      images: [
        "https://media.istockphoto.com/id/971603708/photo/coconut-monkey-souvenirs-sold-on-the-street.jpg?s=612x612&w=0&k=20&c=HnPYiCa_q3Qcoc2YqqwJwXZMiNLZDx3H2g74DE5SqdQ=",
        "https://media.istockphoto.com/id/1370497586/photo/a-pot-made-of-coconut-with-2-holes-on-it-and-an-ornament-and-braided-handles-isolated-on-the.jpg?s=612x612&w=0&k=20&c=B-AK7AsU_7n72sDkgnPwHa9rEgIWg3fpUQNO8Scpy1M="
      ],
      category: "home-decor",
      artisan: {
        name: "Coastal Coconut Artisans",
        location: "Coastal Kenya",
        story: "Coastal communities have utilized coconut shells for centuries, transforming what would be waste into beautiful functional items through careful carving and polishing techniques.",
        yearsExperience: 20
      },
      origin: "Coastal Kenya",
      materials: ["Coconut shells", "Natural oils", "Wood polish"],
      description: "Products such as buttons, small bowls, or pieces of jewelry made from the hard shells of coconuts. The shells are cleaned, cut, sanded, and polished to a smooth finish, often showcasing their natural dark color.",
      dimensions: "Bowls: 10-15cm diameter, Jewelry: 3-8cm",
      careInstructions: "Wipe with dry cloth. Occasional application of coconut oil enhances shine.",
      stock: 60,
      featured: false
    },
    15: {
      id: 15,
      name: "Maasai Beaded Necklaces",
      price: 65.00,
      images: [
        "https://media.istockphoto.com/id/90616365/photo/african-beaded-necklace.jpg?s=612x612&w=0&k=20&c=SoJXcoENVk6Xid2dMri6hfAFiheCvkvJdJEjwk0Jbns=",
        "https://media.istockphoto.com/id/172449410/photo/samburu-clothing.jpg?s=612x612&w=0&k=20&c=uUVIiewPrSX0Jbl2l9hOtJ5vTrbxZByEK5vKV4kDrMk="
      ],
      category: "jewelry",
      artisan: {
        name: "Maasai Women Beadwork Cooperative",
        location: "Maasai Mara",
        story: "Maasai women gather in communal groups to create these elaborate necklaces, sharing stories and techniques while preserving cultural traditions that date back generations.",
        yearsExperience: 18
      },
      origin: "Maasai Mara",
      materials: ["Glass beads", "Wire base", "Leather backing"],
      description: "Large, flat, circular or multi-layered collar necklaces (manyatta) made from glass beads strung on a wire base. The design and size are significant to Maasai culture, indicating the wearer's age and social standing.",
      dimensions: "Diameter: 35-45cm, Weight: 300-500g",
      careInstructions: "Store flat to maintain shape. Avoid pulling on individual beads.",
      stock: 18,
      featured: true
    },
    16: {
      id: 16,
      name: "Wooden Masks",
      price: 75.50,
      images: [
        "https://media.istockphoto.com/id/184618627/photo/vintage-carved-wood-art-of-comedy-and-tragedy-theatre-masks.jpg?s=612x612&w=0&k=20&c=kRi2dqM3gvIY-XXyVyDYeSx3suJU_8ScqvAxMv6xxeU=",
        "https://media.istockphoto.com/id/182065764/photo/african-masks.jpg?s=612x612&w=0&k=20&c=O9BnGvE6Y5ExIb26wORoFWKNxGbeX6klTQHpul0XTIc="
      ],
      category: "art",
      artisan: {
        name: "Tribal Mask Carvers",
        location: "Western Kenya",
        story: "Drawing inspiration from various Kenyan ethnic groups, these carvers create masks that represent ancestral spirits, cultural heroes, and mythological beings from traditional folklore.",
        yearsExperience: 22
      },
      origin: "Various Regions",
      materials: ["Local hardwoods", "Natural pigments"],
      description: "Ceremonial or decorative masks hand-carved from various local woods. Designs vary by ethnic group and often represent spirits, ancestors, or specific animals, featuring intricate carvings and sometimes painted details.",
      dimensions: "20-30cm height, 15-25cm width",
      careInstructions: "Dust with soft brush. Avoid direct sunlight to prevent fading.",
      stock: 15,
      featured: false
    },
    17: {
      id: 17,
      name: "Sisal Mats",
      price: 48.00,
      images: [
        "https://media.istockphoto.com/id/1204181927/photo/jute-braided-home-spiral-rug-background-texture-pattern.jpg?s=612x612&w=0&k=20&c=bkEUx3ljzJWf8eub0d9jCfpo-AniJPY8bf1G6GpmPcw=",
        "https://media.istockphoto.com/id/177320490/photo/craftsman-making-a-rope-rug-or-wall-hanging.jpg?s=612x612&w=0&k=20&c=H1yiFwq9KVM2JdknKIe_0O9ZgOQRBMOmo0aMrbm0rBI="
      ],
      category: "home-decor",
      artisan: {
        name: "Sisal Weavers Cooperative",
        location: "Eastern Kenya",
        story: "Communities in arid regions have perfected sisal cultivation and weaving, creating sustainable livelihoods from this drought-resistant plant while producing beautiful, durable home goods.",
        yearsExperience: 15
      },
      origin: "Eastern Kenya",
      materials: ["Natural sisal fibers", "Plant-based dyes"],
      description: "Large, durable floor coverings handwoven from natural sisal fibers. They are fire-retarding, sound-absorbing, and static-resistant, available in natural earth tones or dyed colors, and can be used both indoors and outdoors.",
      dimensions: "Small: 60x90cm, Medium: 120x180cm, Large: 180x240cm",
      careInstructions: "Vacuum regularly. Spot clean with mild soap. Dry completely.",
      stock: 25,
      featured: false
    },
    18: {
      id: 18,
      name: "Kikoy Fabric",
      price: 29.75,
      images: [
        "https://media.istockphoto.com/id/96691593/photo/masai-blankets-in-kenya.jpg?s=612x612&w=0&k=20&c=IWNt2XLmzHzg4rC5kh5X45IwNOC8KWTJoQ9gJY9JIg4=",
        "https://media.istockphoto.com/id/953737516/photo/colorful-of-native-thai-silk.jpg?s=612x612&w=0&k=20&c=3HobAZKI36AJngbEbqj_ioe__M0A1pItrA0YRNUkMUg="
      ],
      category: "textiles",
      artisan: {
        name: "Coastal Weavers Guild",
        location: "Mombasa",
        story: "Coastal weavers have preserved traditional techniques while adapting to modern tastes, creating the iconic Kikoy fabric that remains a staple of East African coastal culture.",
        yearsExperience: 30
      },
      origin: "Mombasa",
      materials: ["100% Cotton"],
      description: "A traditional East African sarong (worn by men and women) made from 100% cotton. They typically feature vibrant, yarn-dyed stripes and are known for being lightweight and comfortable, often finished with hand-tied tassels.",
      dimensions: "150cm x 100cm",
      careInstructions: "Machine wash cold. Tumble dry low. Iron on cotton setting.",
      stock: 80,
      featured: false
    },
    19: {
      id: 19,
      name: "Embroidered Textiles",
      price: 52.00,
      images: [
        "https://media.istockphoto.com/id/120747323/photo/embroidery.jpg?s=612x612&w=0&k=20&c=cBAwGjRBzZw7cHoeHzJ0Sf33sdIYEK66aoqSDjCR-uA=",
        "https://media.istockphoto.com/id/453658023/photo/mexican-huipil-textile-pattern-background.jpg?s=612x612&w=0&k=20&c=sx_8CIl6DKn201yBcBHteAJSCcZ4I50NjXCYM05RLZ0="
      ],
      category: "textiles",
      artisan: {
        name: "Embroidery Cooperatives",
        location: "Various Regions",
        story: "Women's groups across Kenya have revived traditional embroidery techniques, creating contemporary pieces that tell stories of their communities while providing sustainable income.",
        yearsExperience: 10
      },
      origin: "Various Regions",
      materials: ["Cotton fabric", "Embroidery thread", "Natural dyes"],
      description: "Various fabrics, clothing items, or wall hangings that feature intricate hand-stitched embroidery. The patterns often tell stories or use traditional motifs specific to different Kenyan communities.",
      dimensions: "Wall hangings: 45x60cm, Table runners: 30x150cm",
      careInstructions: "Hand wash cold. Lay flat to dry. Iron on reverse side.",
      stock: 35,
      featured: false
    },
    20: {
      id: 20,
      name: "Bone Crafts",
      price: 41.25,
      images: [
        "https://media.istockphoto.com/id/162269815/photo/voodoo-dolls-at-the-fetish-market-in-lom%C3%A9-togo.jpg?s=612x612&w=0&k=20&c=earibHWji83ekKBGby9lLfncq3abJZEcsDrWQ1e7BGs=",
        "https://media.istockphoto.com/id/1660780433/photo/stone-age-tools-on-white-background-panoramic-view-isolated.jpg?s=612x612&w=0&k=20&c=6ihcQgoAPatoyBuFnmodgAZ1dUQwu2QSRbOonrrda4Q="
      ],
      category: "jewelry",
      artisan: {
        name: "Bone Carvers Association",
        location: "Various Regions",
        story: "Using ethically sourced bone from the meat industry, artisans create beautiful pieces that honor traditional carving techniques while ensuring no waste from food production.",
        yearsExperience: 14
      },
      origin: "Various Regions",
      materials: ["Ethically sourced bone", "Natural polishes"],
      description: "Jewelry items like pendants, earrings, or small figurines carved from ethically sourced animal bone (often cow bone, a byproduct of the meat industry). They are sanded smooth and sometimes dyed or inlaid with other materials.",
      dimensions: "Pendants: 3-8cm, Earrings: 2-4cm",
      careInstructions: "Wipe with dry cloth. Store in dry place away from moisture.",
      stock: 28,
      featured: false
    },
    21: {
      id: 21,
      name: "Horn Crafts",
      price: 67.00,
      images: [
        "https://media.istockphoto.com/id/503861532/photo/wooden-soprano-flute-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=usfuu4EMTXyr5WRRbfb_FvE9zEekzI6em7-YlV15RL0=",
        "https://media.istockphoto.com/id/180723040/photo/musical-instruments-collage.jpg?s=612x612&w=0&k=20&c=bdhrXIy03DhJgJXYQmiVDKvDDh0h8vjo8RXtnb6D0-Q="
      ],
      category: "home-decor",
      artisan: {
        name: "Horn Artisans Guild",
        location: "Rift Valley",
        story: "Skilled artisans work with naturally shed animal horns, transforming them into beautiful functional items using techniques that highlight the unique natural patterns of each piece.",
        yearsExperience: 18
      },
      origin: "Rift Valley",
      materials: ["Polished animal horn", "Food-safe finishes"],
      description: "Decorative or functional items such as serving spoons, small dishes, or ornaments crafted from polished animal horns (like cow horn). The material is heated, shaped, and polished to reveal unique natural patterns.",
      dimensions: "Spoons: 15-20cm, Bowls: 10-15cm diameter",
      careInstructions: "Hand wash with mild soap. Dry immediately. Oil occasionally.",
      stock: 20,
      featured: false
    },
    22: {
      id: 22,
      name: "Traditional Drums",
      price: 150.00,
      images: [
        "https://media.istockphoto.com/id/1254930648/photo/panamanian-drums.jpg?s=612x612&w=0&k=20&c=ONOt3W1vlUnll4WU2jgrPbHPeLS0Z0CIUCJdf3EilPI=",
        "https://media.istockphoto.com/id/2213132033/photo/korean-traditional-musical-instruments.jpg?s=612x612&w=0&k=20&c=k4d0K7hpeWMmkUcyTKwGxgpU6icjEBuh6iNDJsIF0z4="
      ],
      category: "musical-instruments",
      artisan: {
        name: "Drum Makers Collective",
        location: "Various Regions",
        story: "Master drum makers from different ethnic groups continue ancestral traditions, creating instruments that produce the authentic sounds used in ceremonies, celebrations, and cultural events.",
        yearsExperience: 25
      },
      origin: "Various Regions",
      materials: ["Wood", "Animal hide", "Leather thongs"],
      description: "Hand-carved wooden instruments with a hollow body, typically covered with stretched animal hide (often cow or goat skin) held taut with leather thongs or pegs. They vary widely in size and specific use across different tribes.",
      dimensions: "Small: 30cm height, Medium: 45cm, Large: 60cm",
      careInstructions: "Keep away from extreme humidity. Tighten cords as needed.",
      stock: 8,
      featured: true
    },
    23: {
      id: 23,
      name: "Beaded Belts",
      price: 45.50,
      images: [
        "https://media.istockphoto.com/id/2203383474/photo/handcrafted-beaded-belt-with-shells.jpg?s=612x612&w=0&k=20&c=s4PFZBBY93FdRaXpXxqvQ07QnmES1TllORmRCHp9L_8=",
        "https://media.istockphoto.com/id/1271150418/photo/tribal-colorful-beads-bracelets-for-sale-for-tourists-at-the-street-market-in-kota-kinabalu.jpg?s=612x612&w=0&k=20&c=jxWqwZJ7Rhz0GPDKH7p5K0YKyJpZFOBIF_LQnvrbp5g="
      ],
      category: "accessories",
      artisan: {
        name: "Maasai Belt Makers",
        location: "Narok",
        story: "Continuing the rich tradition of Maasai beadwork, artisans create these belts using the same symbolic color patterns and techniques that have identified their culture for generations.",
        yearsExperience: 12
      },
      origin: "Narok",
      materials: ["Leather", "Glass beads", "Metal buckle"],
      description: "Leather belts adorned with vibrant glass beadwork, similar in style to the dog collars. They are durable, stylish accessories that often feature specific tribal patterns and are fastened with a metal buckle.",
      dimensions: "Adjustable: 80-110cm length, 4cm width",
      careInstructions: "Wipe clean. Avoid excessive bending. Store flat.",
      stock: 32,
      featured: false
    },
    24: {
      id: 24,
      name: "Pottery (Clay Pots)",
      price: 38.00,
      images: [
        "https://media.istockphoto.com/id/695916244/photo/lots-of-handmade-tableware-ceramic-cups-plates-at-pottery-shop.jpg?s=612x612&w=0&k=20&c=rgbSxNuRH8SS-YCipKnW5KL12qeGngxas5ERvk6ozsk=",
        "https://media.istockphoto.com/id/694329856/photo/blue-pottery-works-in-okinawa.jpg?s=612x612&w=0&k=20&c=DVZBgyJPJ8WoMyhyYkM2R6qjNI57dd6UjQO96NsAszg="
      ],
      category: "home-decor",
      artisan: {
        name: "Pottery Communities Network",
        location: "Western Kenya",
        story: "Pottery families continue ancient ceramic traditions, sourcing local clay and using pit-firing techniques that have been practiced in their communities for countless generations.",
        yearsExperience: 35
      },
      origin: "Western Kenya",
      materials: ["Local clay", "Natural minerals", "Ash glazes"],
      description: "Functional and decorative items like cooking pots (mitungi), water storage vessels, or planters made from locally sourced clay. They are typically coil-built or pinch-potted, sun-dried, and pit-fired, often with simple, incised decoration.",
      dimensions: "Small: 15cm height, Medium: 25cm, Large: 35cm",
      careInstructions: "Hand wash only. Not microwave or dishwasher safe.",
      stock: 40,
      featured: false
    },
    25: {
      id: 25,
      name: "Handmade Paper Crafts",
      price: 22.99,
      images: [
        "https://media.istockphoto.com/id/1263010576/vector/seamless-panoramic-banner-for-the-day-of-the-dead-decorations-mexican-dia-de-muertos-papel.jpg?s=612x612&w=0&k=20&c=1smoAa8Jfl6B_MevDvZwzjkrGfhCrIVEl51bqDPAxsY=",
        "https://media.istockphoto.com/id/990542870/vector/flat-colorful-design-concept-for-handmade.jpg?s=612x612&w=0&k=20&c=ej43-WlTCgAOAfpOKxwUPu14TGXajsB227wrMurqiSk="
      ],
      category: "stationery",
      artisan: {
        name: "Paper Craft Cooperatives",
        location: "Nairobi",
        story: "Social enterprises have developed paper-making initiatives that provide employment while promoting environmental sustainability through recycling and using natural fibers.",
        yearsExperience: 8
      },
      origin: "Nairobi",
      materials: ["Recycled paper", "Banana fibers", "Cotton rags"],
      description: "Paper created from recycled waste paper mixed with natural fibers such as grass, banana leaves, or cotton rags. The paper is used to make cards, stationery, or art pieces, often with a unique, textured finish.",
      dimensions: "Cards: 10x15cm, Stationery: A5 and A4 sizes",
      careInstructions: "Keep away from moisture. Store in cool, dry place.",
      stock: 75,
      featured: false
    },
    26: {
      id: 26,
      name: "Carved Wooden Walking Sticks",
      price: 55.75,
      images: [
        "https://media.istockphoto.com/id/1922211519/photo/walking-sticks-part-of-the-mass-produced-hand-made-souvenirs-on-bazaar-market-stalls.jpg?s=612x612&w=0&k=20&c=zlHKCQdJ8Wb9TFjMYytc1b8Q2xtoZAp0ZXcYUcwQ7kk=",
        "https://media.istockphoto.com/id/2159242410/photo/wooden-cane-with-knob-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=a9ArKAcRcNcMYb0DqkxxBkD8XUTmbTB3Kr3LHcq6jj8="
      ],
      category: "accessories",
      artisan: {
        name: "Wood Carvers Association",
        location: "Various Regions",
        story: "Master carvers select the perfect pieces of wood for each walking stick, ensuring both beauty and functionality while carving designs that reflect Kenyan wildlife and cultural symbols.",
        yearsExperience: 20
      },
      origin: "Various Regions",
      materials: ["Hardwood", "Wood polish"],
      description: "Sturdy walking sticks or canes hand-carved from hardwoods. They often feature detailed carvings of animal heads (like an elephant or lion) or geometric patterns along the shaft.",
      dimensions: "Standard: 90-100cm height, Custom sizes available",
      careInstructions: "Wipe with dry cloth. Occasional wood polish application.",
      stock: 18,
      featured: false
    },
    27: {
      id: 27,
      name: "Musical Instruments",
      price: 95.00,
      images: [
        "https://media.istockphoto.com/id/95655137/photo/a-single-wooden-cello-on-a-white-background.jpg?s=612x612&w=0&k=20&c=XQbZ4jsZ228ISqYZoDcAiqK-bqpY9W71Wv5J94ZFK74=",
        "https://media.istockphoto.com/id/1302833945/photo/cellos-and-musicians.jpg?s=612x612&w=0&k=20&c=MmN3LZBeJb5CkUHnrvxZfPvPIibI8Wmj-EvY97eqgV8="
      ],
      category: "musical-instruments",
      artisan: {
        name: "Traditional Instrument Makers",
        location: "Various Regions",
        story: "Instrument makers from different ethnic groups preserve the unique sounds of Kenyan music, creating instruments using traditional methods and locally sourced materials.",
        yearsExperience: 22
      },
      origin: "Various Regions",
      materials: ["Wood", "Gourds", "Natural strings"],
      description: "A variety of traditional instruments, including the nyatiti (a stringed lyre-like instrument), chondo (leg rattles made from seed pods), and flutes, crafted from natural materials like wood, reeds, or gourds.",
      dimensions: "Nyatiti: 60-80cm, Flutes: 30-50cm",
      careInstructions: "Store in dry place. Handle with care. Professional tuning recommended.",
      stock: 12,
      featured: false
    },
    28: {
      id: 28,
      name: "Beaded Coasters",
      price: 28.50,
      images: [
        "https://media.istockphoto.com/id/1271150418/photo/tribal-colorful-beads-bracelets-for-sale-for-tourists-at-the-street-market-in-kota-kinabalu.jpg?s=612x612&w=0&k=20&c=jxWqwZJ7Rhz0GPDKH7p5K0YKyJpZFOBIF_LQnvrbp5g=",
        "https://media.istockphoto.com/id/2203383474/photo/handcrafted-beaded-belt-with-shells.jpg?s=612x612&w=0&k=20&c=s4PFZBBY93FdRaXpXxqvQ07QnmES1TllORmRCHp9L_8="
      ],
      category: "home-decor",
      artisan: {
        name: "Beadwork Artisans Collective",
        location: "Nairobi",
        story: "Artisans apply traditional beadwork techniques to create functional home items, bringing cultural beauty into everyday life while preserving their craft for future generations.",
        yearsExperience: 9
      },
      origin: "Nairobi",
      materials: ["Glass beads", "Felt backing", "Strong thread"],
      description: "Small, circular or square mats for resting drinks, meticulously made using fine glass beads. They are typically backed with felt or soft leather to protect table surfaces.",
      dimensions: "10x10cm square or 12cm diameter round",
      careInstructions: "Wipe surface with damp cloth. Do not submerge in water.",
      stock: 50,
      featured: false
    },
    29: {
      id: 29,
      name: "Fabric Dolls",
      price: 32.25,
      images: [
        "https://media.istockphoto.com/id/2185882236/photo/handmade-crocheted-bear-toys-stuffed-toy-amigurumi.jpg?s=612x612&w=0&k=20&c=Of_ExYmmbRfUdKdSLPYzFcDz4PBuaxqJFnpnt3N6_Sw=",
        "https://media.istockphoto.com/id/1301973268/photo/colorful-rag-dolls.jpg?s=612x612&w=0&k=20&c=U-0tREAsPu1wbRLi2HqAMk6xL_OjEF-nx0RlNz8LOXY="
      ],
      category: "toys",
      artisan: {
        name: "Women's Cooperatives Network",
        location: "Various Regions",
        story: "Women's groups create these dolls as both toys and educational tools, dressing them in authentic traditional costumes to teach children about Kenya's diverse cultures.",
        yearsExperience: 7
      },
      origin: "Various Regions",
      materials: ["Fabric", "Stuffing", "Embroidery thread"],
      description: "Handmade soft-body dolls often made by women's cooperatives. They are dressed in colorful traditional Kenyan fabrics like kanga or shuka, representing the diverse cultures of the country.",
      dimensions: "25-30cm height",
      careInstructions: "Surface clean only. Not machine washable.",
      stock: 35,
      featured: false
    },
    30: {
      id: 30,
      name: "Recycled Metal Art Sculptures",
      price: 88.00,
      images: [
        "https://media.istockphoto.com/id/471183694/photo/metal-bird-near-its-nest.jpg?s=612x612&w=0&k=20&c=t7CUMyJJ12xFsssuhwha-0EsNfgJnMOKkq-2VlBkb9Q=",
        "https://media.istockphoto.com/id/2200391926/photo/fish-sculpture-crafted-from-rusted-metal-with-colorful-mosaic-detailing-displayed-at-the.jpg?s=612x612&w=0&k=20&c=kCBhFsr_1cblODPnhXsmTJEMr2JEVkfJdc-lwWaR1E8="
      ],
      category: "sculptures",
      artisan: {
        name: "Metal Artists Collective",
        location: "Nairobi",
        story: "Innovative artists transform industrial waste into stunning sculptures, demonstrating incredible creativity while promoting environmental awareness and sustainable art practices.",
        yearsExperience: 11
      },
      origin: "Nairobi",
      materials: ["Recycled scrap metal", "Welding materials"],
      description: "Sculptures ranging from small figurines to large garden art made by welding or assembling scrap metal pieces from cars, machines, and other waste sources. This art form emphasizes recycling and creativity in transforming waste into art.",
      dimensions: "Small: 15-25cm, Medium: 30-50cm, Large: 60-100cm",
      careInstructions: "Suitable for indoor and outdoor use. Rust adds character.",
      stock: 15,
      featured: true
    }
  };

  const product = products[id] || products[1]; // Fallback to first product if not found

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });
    toast.success(`Added ${product.name} to cart!`, {
      icon: '🛒',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-kenyan-brown">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-kenyan-brown">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-kenyan-brown capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg border overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-maasai-red' : 'border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">{product.name}</h1>
              <p className="text-maasai-red font-semibold">From {product.origin}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-kenyan-chocolate">${product.price}</span>
            <span className="ml-2 text-sm text-gray-600">USD</span>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Artisan Story */}
          <div className="bg-cream rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-lg mb-2">Artisan Story</h3>
            <p className="text-gray-700 mb-2">{product.artisan.story}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-kenyan-brown font-semibold">
                Crafted by {product.artisan.name}
              </span>
              <span className="text-gray-600">
                {product.artisan.yearsExperience} years of experience
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Materials</h4>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <span
                    key={index}
                    className="bg-kenyan-gold text-kenyan-brown px-3 py-1 rounded-full text-sm"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Dimensions:</span>
                <p className="text-gray-600">{product.dimensions}</p>
              </div>
              <div>
                <span className="font-semibold">Care:</span>
                <p className="text-gray-600">{product.careInstructions}</p>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="border-t pt-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-600">
                {product.stock} available
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-maasai-red text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>

            {product.stock === 0 && (
              <p className="text-red-600 text-center mt-2">Out of Stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;