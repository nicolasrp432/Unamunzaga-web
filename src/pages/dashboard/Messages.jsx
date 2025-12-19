import React, { useState } from 'react';
import { useMessages } from '../../hooks/useMessages';
import { 
    Loader2, 
    Mail, 
    Phone, 
    Calendar, 
    Trash2, 
    CheckCircle, 
    MessageSquare,
    Search,
    Filter
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Messages = () => {
    const { messages, loading, error, markAsRead, deleteMessage } = useMessages();
    const [filter, setFilter] = useState('all'); // all, unread, read
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter(msg => {
        const matchesSearch = 
            msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.message.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = 
            filter === 'all' ? true : 
            filter === 'unread' ? msg.status === 'unread' : 
            msg.status !== 'unread'; // read or replied

        return matchesSearch && matchesFilter;
    });

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
            await deleteMessage(id);
        }
    };

    const handleMarkAsRead = async (id) => {
        await markAsRead(id);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                Error al cargar los mensajes: {error.message}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mensajes</h1>
                    <p className="text-gray-500">Gestión de consultas y contactos</p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        {messages.filter(m => m.status === 'unread').length} sin leer
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">{messages.length} total</span>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar mensajes..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                    <Filter className="text-gray-400 w-5 h-5 hidden sm:block" />
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                            filter === 'all' 
                                ? 'bg-gray-900 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                            filter === 'unread' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Sin leer
                    </button>
                    <button
                        onClick={() => setFilter('read')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                            filter === 'read' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Leídos
                    </button>
                </div>
            </div>

            {/* Messages List */}
            <div className="grid gap-4">
                {filteredMessages.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No hay mensajes</h3>
                        <p className="text-gray-500">No se encontraron mensajes con los filtros actuales.</p>
                    </div>
                ) : (
                    filteredMessages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`bg-white rounded-xl p-6 shadow-sm border transition-all ${
                                msg.status === 'unread' 
                                    ? 'border-blue-200 shadow-md ring-1 ring-blue-50' 
                                    : 'border-gray-100'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                        msg.status === 'unread' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        <span className="font-bold text-lg">{msg.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">{msg.name}</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {format(new Date(msg.created_at), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 self-start md:self-center">
                                    {msg.status === 'unread' && (
                                        <button
                                            onClick={() => handleMarkAsRead(msg.id)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors tooltip-trigger"
                                            title="Marcar como leído"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Eliminar mensaje"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3 pl-0 md:pl-14">
                                {msg.subject && (
                                    <div className="font-medium text-gray-800 bg-gray-50 inline-block px-3 py-1 rounded-md text-sm">
                                        {msg.subject}
                                    </div>
                                )}
                                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                                    {msg.message}
                                </p>
                                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                                    <a 
                                        href={`mailto:${msg.email}`} 
                                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-lg"
                                    >
                                        <Mail className="w-4 h-4" />
                                        {msg.email}
                                    </a>
                                    {msg.phone && (
                                        <a 
                                            href={`tel:${msg.phone}`} 
                                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors bg-gray-50 hover:bg-green-50 px-3 py-2 rounded-lg"
                                        >
                                            <Phone className="w-4 h-4" />
                                            {msg.phone}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Messages;
