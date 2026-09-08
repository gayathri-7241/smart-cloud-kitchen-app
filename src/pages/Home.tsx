import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Truck, ShieldCheck, Star, Utensils, Heart, Leaf } from 'lucide-react';
const heroImage = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920';
const aboutImage = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200';

const menuItems = [
  { name: 'Truffle Butter Chicken', desc: 'Creamy tomato curry with a truffle twist', price: '$18', tag: 'Bestseller' },
  { name: 'Saffron Biryani', desc: 'Aromatic basmati layered with tender lamb', price: '$22', tag: 'Chef Special' },
  { name: 'Charred Octopus', desc: 'Mediterranean octopus with smoked paprika', price: '$26', tag: 'New' },
  { name: 'Wagyu Slider Stack', desc: 'Mini burgers with caramelized onions', price: '$16', tag: 'Popular' },
  { name: 'Dragon Roll Sushi', desc: 'Tempura shrimp, avocado, eel sauce', price: '$19', tag: 'Trending' },
  { name: 'Molten Chocolate Cake', desc: 'Warm center with vanilla bean gelato', price: '$12', tag: 'Dessert' },
];

export default function Home() {
  return (
    <div className="bg-neutral-950">
      {/* Section 1: Hero */}
      <section id="home" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Gourmet food" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-orange-400" />
              Rated #1 Cloud Kitchen of 2026
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Restaurant-quality meals,
              <span className="block bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                delivered to your door.
              </span>
            </h1>
            <p className="mt-6 text-lg text-neutral-300 leading-relaxed max-w-xl">
              Saffron Kitchen crafts bold, globally-inspired dishes in our cloud kitchen and ships them hot to your home. No reservations, no waiting — just extraordinary food, on demand.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5"
              >
                Start Ordering
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                View Menu
              </a>
            </div>
            <div className="mt-12 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="text-sm text-neutral-400">Orders Delivered</p>
              </div>
              <div className="w-px bg-neutral-800" />
              <div>
                <p className="text-3xl font-bold text-white">4.9</p>
                <p className="text-sm text-neutral-400">Avg Rating</p>
              </div>
              <div className="w-px bg-neutral-800" />
              <div>
                <p className="text-3xl font-bold text-white">30min</p>
                <p className="text-sm text-neutral-400">Avg Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: 'Lightning Fast Delivery', desc: 'Hot, fresh meals at your door in 30 minutes or less — guaranteed.' },
              { icon: ShieldCheck, title: 'Quality You Can Trust', desc: 'Every dish is prepared in a certified kitchen with premium ingredients.' },
              { icon: Clock, title: 'Open Late, Every Day', desc: 'Cravings dont keep hours. We cook from 11am to midnight, 7 days a week.' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-orange-500/30 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-6 group-hover:from-orange-500/30 group-hover:to-amber-500/30 transition-colors">
                  <feature.icon className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Menu */}
      <section id="menu" className="py-24 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
              <Utensils className="w-4 h-4" />
              Our Signature Dishes
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Crafted to make you crave more
            </h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
              A curated selection of our most-loved dishes, prepared fresh daily by our award-winning chefs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-orange-500/40 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">
                    {item.tag}
                  </span>
                  <span className="text-2xl font-bold text-white">{item.price}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
            >
              See full menu & order
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: About */}
      <section id="about" className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={aboutImage} alt="Chef preparing food" className="rounded-3xl w-full h-[500px] object-cover" />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 p-8 flex flex-col justify-center shadow-2xl shadow-orange-500/20">
                <p className="text-4xl font-bold text-white">15+</p>
                <p className="text-white/90 text-sm mt-1">Years of culinary excellence</p>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />
                Our Story
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                From a small kitchen to your favorite delivery
              </h2>
              <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
                What started as a single food truck in 2011 has grown into Saffron Kitchen — a cloud kitchen serving thousands of meals daily. We believe great food shouldnt require a reservation.
              </p>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                Our chefs blend traditional techniques with modern flavors, sourcing local ingredients to create dishes that surprise and delight. Every plate is a testament to our love for food.
              </p>
              <div className="mt-8 flex gap-6">
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-orange-400" />
                  <span className="text-neutral-300 text-sm">Locally Sourced</span>
                </div>
                <div className="flex items-center gap-3">
                  <Utensils className="w-5 h-5 text-orange-400" />
                  <span className="text-neutral-300 text-sm">Chef Crafted</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-orange-400" />
                  <span className="text-neutral-300 text-sm">Made Fresh Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Hungry? Lets fix that.
              </h2>
              <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
                Create your free account and get access to exclusive deals, faster checkout, and your order history.
              </p>
              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-orange-600 font-semibold hover:bg-neutral-100 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
