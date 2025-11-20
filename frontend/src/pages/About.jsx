// src/pages/About.jsx
import React from 'react';
import { Heart, Shield, Globe, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Artisan First',
      description: 'We ensure fair wages and direct support to craftspeople, preserving traditional skills.'
    },
    {
      icon: Shield,
      title: 'Authenticity Guaranteed',
      description: 'Every product is verified for authenticity and comes with its artisan\'s story.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Connecting Kenyan heritage with the world while supporting local communities.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Building sustainable partnerships with artisan cooperatives across Kenya.'
    }
  ];

  const team = [
    {
      name: 'Sarah Mwende',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Passionate about preserving Kenyan cultural heritage through sustainable commerce.'
    },
    {
      name: 'David Kimani',
      role: 'Head of Artisan Relations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Works directly with artisan communities to ensure fair trade practices.'
    },
    {
      name: 'Grace Akinyi',
      role: 'Product Curator',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Expert in traditional Kenyan crafts and cultural preservation.'
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-kenyan-brown to-kenyan-chocolate text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-kenyan-gold">
            Connecting Kenyan Heritage with the World
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kionjo was born from a deep appreciation for Kenyan craftsmanship and a desire to 
              create sustainable economic opportunities for artisans. We bridge the gap between 
              traditional Kenyan crafts and global markets, ensuring that every purchase supports 
              cultural preservation and community development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1586023492125-27a3dac85c3f?w=600&h=400&fit=crop"
                alt="Kenyan artisans at work"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Preserving Heritage</h3>
              <p className="text-gray-600 mb-4">
                Each craft tells a story of Kenyan culture, tradition, and skill passed down 
                through generations. From Maasai beadwork to Kisii soapstone carving, we celebrate 
                the diversity and richness of Kenyan artistic expression.
              </p>
              <p className="text-gray-600">
                By providing a global platform for these artisans, we're not just selling products – 
                we're preserving cultural heritage and ensuring these traditional skills continue 
                to thrive in the modern world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-kenyan-gold rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-kenyan-brown" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Our Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-cream rounded-lg p-6">
              <div className="text-3xl font-bold text-maasai-red mb-2">500+</div>
              <div className="text-gray-600">Artisans Supported</div>
            </div>
            <div className="bg-cream rounded-lg p-6">
              <div className="text-3xl font-bold text-maasai-red mb-2">50+</div>
              <div className="text-gray-600">Communities Impacted</div>
            </div>
            <div className="bg-cream rounded-lg p-6">
              <div className="text-3xl font-bold text-maasai-red mb-2">25+</div>
              <div className="text-gray-600">Countries Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-kenyan-brown mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;