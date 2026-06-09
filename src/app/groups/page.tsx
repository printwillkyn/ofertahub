
"use client"

import * as React from "react"
import { 
  Users, 
  Plus, 
  Hash, 
  Settings2, 
  MoreHorizontal, 
  Zap, 
  Clock, 
  Star, 
  ShieldCheck, 
  BarChart3,
  MessageSquare,
  Activity
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const groupsData = [
  {
    id: "1",
    name: "Ofertas Tech Brasil",
    platform: "WhatsApp",
    lastDispatch: "Hoje às 14:20",
    offersToday: 8,
    niches: ["Tecnologia", "Games"],
    status: "connected",
    waId: "1203630248593@g.us"
  },
  {
    id: "2",
    name: "Casa & Cozinha VIP",
    platform: "WhatsApp",
    lastDispatch: "Hoje às 09:42",
    offersToday: 4,
    niches: ["Casa", "Cozinha", "Organização", "Limpeza"],
    status: "connected",
    waId: "1203630312456@g.us"
  },
  {
    id: "3",
    name: "Mães de Plantão",
    platform: "WhatsApp",
    lastDispatch: "Ontem às 18:00",
    offersToday: 0,
    niches: ["Bebê", "Utilidades"],
    status: "disconnected",
    waId: "1203630456789@g.us"
  },
  {
    id: "4",
    name: "Organização & Limpeza",
    platform: "WhatsApp",
    lastDispatch: "Hoje às 11:15",
    offersToday: 6,
    niches: ["Organização", "Limpeza", "Utilidades"],
    status: "connected",
    waId: "1203630567890@g.us"
  }
]

const nichesList = [
  "Casa", "Cozinha", "Organização", "Limpeza", "Bebê", 
  "Utilidades", "Fitness", "Tecnologia", "Ferramentas", 
  "Automotivo", "Pets"
]

export default function DistributionPage() {
  const [selectedGroup, setSelectedGroup] = React.useState<any>(null)
  const [isConfigOpen, setIsConfigOpen] = React.useState(false)

  const handleOpenConfig = (group: any) => {
    setSelectedGroup(group)
    setIsConfigOpen(true)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-foreground">Distribuição Inteligente</h1>
          <p className="text-muted-foreground">Gerencie seus canais de distribuição e defina como cada oferta será entregue.</p>
        </div>
        <Button className="bg-primary rounded-lg shadow-lg shadow-primary/20" onClick={() => handleOpenConfig(null)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Grupo
        </Button>
      </div>

      {/* CARDS SUPERIORES */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Grupos Ativos" value="12" icon={<Users className="h-5 w-5 text-blue-600" />} change="+2" />
        <MetricCard title="Grupos Conectados" value="10" icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />} />
        <MetricCard title="Disparos Hoje" value="156" icon={<Zap className="h-5 w-5 text-amber-600" />} change="+12%" />
        <MetricCard title="Nichos Monitorados" value="08" icon={<Activity className="h-5 w-5 text-indigo-600" />} />
      </div>

      {/* CARDS DOS GRUPOS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groupsData.map((group) => (
          <Card key={group.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  group.status === "connected" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-headline font-bold">{group.name}</CardTitle>
                  <CardDescription className="text-[10px] font-mono uppercase tracking-tighter">
                    {group.waId}
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Último Disparo</p>
                  <p className="text-xs font-medium text-foreground">{group.lastDispatch}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Ofertas Hoje</p>
                  <p className="text-xs font-bold text-primary">{group.offersToday} disparos</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Nichos Vinculados</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.niches.map((niche) => (
                    <Badge key={niche} variant="secondary" className="bg-muted/50 text-muted-foreground border-none text-[9px] uppercase font-bold tracking-tight px-1.5 py-0">
                      {niche}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center border-t border-muted/20">
              <div className="flex items-center text-[10px] font-bold uppercase tracking-wider">
                <div className={cn(
                  "h-2 w-2 rounded-full mr-2",
                  group.status === "connected" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                )} />
                {group.status === "connected" ? "Conectado" : "Desconectado"}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary h-8 text-xs font-bold hover:bg-primary/5"
                onClick={() => handleOpenConfig(group)}
              >
                <Settings2 className="h-3.5 w-3.5 mr-1" /> Configurar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* CONFIGURAR GRUPO MODAL */}
      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogContent className="sm:max-w-[800px] h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-headline font-bold">
              {selectedGroup ? `Configurar Grupo: ${selectedGroup.name}` : "Adicionar Novo Grupo"}
            </DialogTitle>
            <DialogDescription>
              Defina as regras de inteligência e limites de entrega para este canal.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-8 pb-8">
              {/* SEÇÃO 1 - Informações Gerais */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> 1. Informações Gerais
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Grupo</Label>
                    <Input defaultValue={selectedGroup?.name} placeholder="Ex: Ofertas VIP Casa" />
                  </div>
                  <div className="space-y-2">
                    <Label>ID do WhatsApp</Label>
                    <Input defaultValue={selectedGroup?.waId} placeholder="1203630... @g.us" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Descrição Interna</Label>
                    <Textarea placeholder="Para controle da sua equipe..." className="h-20 resize-none" />
                  </div>
                </div>
              </div>

              {/* SEÇÃO 2 - Nichos Permitidos */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Hash className="h-4 w-4" /> 2. Nichos Permitidos
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {nichesList.map((niche) => (
                    <div key={niche} className="flex items-center space-x-2">
                      <Checkbox id={`niche-${niche}`} defaultChecked={selectedGroup?.niches.includes(niche)} />
                      <label htmlFor={`niche-${niche}`} className="text-sm font-medium leading-none cursor-pointer">
                        {niche}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEÇÃO 3 - Prioridade dos Nichos */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Star className="h-4 w-4" /> 3. Prioridade dos Nichos
                </h3>
                <p className="text-xs text-muted-foreground">O sistema priorizará ofertas com score alto e nichos de maior prioridade.</p>
                <div className="space-y-6">
                  {nichesList.slice(0, 4).map((niche) => (
                    <div key={niche} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold">{niche}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={cn("h-3 w-3", s <= 4 ? "text-amber-500 fill-amber-500" : "text-muted")} />
                          ))}
                        </div>
                      </div>
                      <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* SEÇÃO 4 - Limites de Disparo */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4" /> 4. Limites de Disparo
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Máximo por Dia</Label>
                    <Input type="number" defaultValue={10} className="font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label>Máximo por Hora</Label>
                    <Input type="number" defaultValue={2} className="font-bold" />
                  </div>
                </div>
              </div>

              {/* SEÇÃO 5 - Horários Permitidos */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Clock className="h-4 w-4" /> 5. Horários Permitidos
                </h3>
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="time-morning" defaultChecked />
                    <Label htmlFor="time-morning">Manhã (08h-12h)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="time-afternoon" defaultChecked />
                    <Label htmlFor="time-afternoon">Tarde (12h-18h)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="time-night" defaultChecked />
                    <Label htmlFor="time-night">Noite (18h-22h)</Label>
                  </div>
                </div>
              </div>

              {/* SEÇÃO 6 - Mensagem Padrão do Grupo */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> 6. Mensagem Padrão do Grupo
                </h3>
                <div className="space-y-2">
                  <Label>Estrutura da Cópia (Customizada)</Label>
                  <Textarea 
                    className="font-mono text-xs leading-relaxed h-32" 
                    defaultValue={`🔥 ACHADINHO DO DIA\n\n📦 {produto}\n\n💰 De: R$ {preco_anterior}\n🔥 Por: R$ {preco_atual}\n\n🛒 Comprar:\n{link}`}
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["produto", "preco_anterior", "preco_atual", "link"].map(v => (
                      <Badge key={v} variant="outline" className="text-[9px] font-mono">{`{${v}}`}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-6 border-t bg-muted/20">
            <Button variant="ghost" onClick={() => setIsConfigOpen(false)}>Cancelar</Button>
            <Button className="bg-primary px-8" onClick={() => setIsConfigOpen(false)}>Salvar Configurações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MetricCard({ title, value, icon, change }: { title: string, value: string, icon: React.ReactNode, change?: string }) {
  return (
    <Card className="border-none shadow-sm group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/5 transition-colors">
            {icon}
          </div>
          {change && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {change}
            </span>
          )}
        </div>
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
          <h3 className="text-2xl font-headline font-bold text-foreground mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
