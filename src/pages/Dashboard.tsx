import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Package, Clock, CheckCircle, Plus, Loader2, Utensils, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase, type Order } from '@/lib/supabase';

export default function Dashboard() {
  const { session, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !session) {
      navigate('/login');
    }
  }, [authLoading, session, navigate]);

  useEffect(() => {
    if (!session?.user) return;
    (async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      setOrders((data as Order[]) ?? []);
      setLoadingOrders(false);
    })();
  }, [session]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    setSubmitting(true);
    const pricePerItem = 15;
    const { data } = await supabase
      .from('orders')
      .insert({
        user_id: session.user.id,
        item_name: itemName,
        quantity,
        total_price: pricePerItem * quantity,
        status: 'pending',
      })
      .select('*')
      .single();
    if (data) {
      setOrders([data as Order, ...orders]);
      setItemName('');
      setQuantity(1);
      setShowOrderForm(false);
    }
    setSubmitting(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: Package, color: 'from-orange-500 to-amber-500' },
    { label: 'Pending', value: orders.filter((o) => o.status === 'pending').length, icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { label: 'Delivered', value: orders.filter((o) => o.status === 'delivered').length, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome back, {profile?.full_name?.split(' ')[0] ?? 'Chef'}
            </h1>
            <p className="mt-1 text-neutral-400">Heres whats cooking in your account</p>
          </div>
          <button
            onClick={() => setShowOrderForm(!showOrderForm)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-5 h-5" />
            Place New Order
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Form Modal */}
        {showOrderForm && (
          <div className="mb-8 p-6 rounded-2xl bg-neutral-900 border border-orange-500/30">
            <h3 className="text-lg font-bold text-white mb-4">Place a New Order</h3>
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-300 mb-2">Dish Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                  placeholder="e.g. Truffle Butter Chicken"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
                />
              </div>
              <div className="sm:col-span-3 flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  Confirm Order
                </button>
                <button
                  type="button"
                  onClick={() => setShowOrderForm(false)}
                  className="px-6 py-3 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Orders List */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-400" />
              Your Orders
            </h2>
          </div>
          {loadingOrders ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center">
              <ChefHat className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
              <p className="text-neutral-400">No orders yet. Place your first order to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-800">
              {orders.map((order) => (
                <div key={order.id} className="p-6 flex items-center justify-between hover:bg-neutral-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{order.item_name}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                        <span>Qty: {order.quantity}</span>
                        <span>${order.total_price}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
                      order.status === 'delivered'
                        ? 'bg-green-500/10 text-green-400'
                        : order.status === 'preparing'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Card */}
        {profile && (
          <div className="mt-8 p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              Your Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-neutral-400">Full Name</p>
                <p className="text-white font-medium mt-1">{profile.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Phone</p>
                <p className="text-white font-medium mt-1">{profile.phone}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Delivery Address</p>
                <p className="text-white font-medium mt-1">{profile.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
