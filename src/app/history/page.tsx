
"use client"

import * as React from "react"
import { 
  History, 
  LayoutTemplate, 
  Send, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  ShoppingCart, 
  DollarSign, 
  Copy,
  RotateCcw,
  ExternalLink,
  AlertTriangle,
  ChevronRight,
  MousePointer2
} from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// --- MOCK DATA ---
const historyData = [
  {
    id: "1",
    product: "Airfryer Philips Walita Essential",
    niche: "Cozinha",
    groups: ["Ofertas Tech", "Casa & Cozinha"],
    sentAt: "14/03/2024 14:20",
    clicks: 1245,
    sales: 42,
    commission: "R$ 420,00",
    conversion: "3.4%",
    status: "sent",
    isRecent: true,
    image: "https://picsum.photos/seed/kitchen1/400/400",
    score: 98,
    link: "https://amazon.com.br/airfryer",
    message: "🔥 ACHADINHO DO DIA\n\n📦 Airfryer Philips Walita Essential\n\n💰 De: R$ 599,00\n🔥 Por: R$ 449,90\n\n⭐ Avaliação: 4.9\n\n🛒 Comprar:\nhttps://amzn.to/3afiliado"
  },
  {
    id: "2",
    product: "Mop Giratório Flash Limp",
    niche: "Limpeza",
    groups: ["Dicas de Limpeza"],
    sentAt: "14/03/2024 10:15",
    clicks: 842,
    sales: 15,
    commission: "R$ 45,00",
    conversion: "1.8%",
    status: "sent",
    isRecent: false,
    image: "https://picsum.photos/seed/cleaning1/400/400",
    score: 92,
    link: "https://mercadolivre.com.br/mop",
    message: "🚨 PREÇO CAIU!\n\n📦 Mop Giratório Flash Limp\n\n💸 Economia de 30%\n\n🔥 Oferta encontrada agora:\nR$ 69,90\n\n🛒 Link:\nhttps://ml.to/3afiliado"
  },
  {
    id: "3",
    product: "Fralda Pampers Premium G",
    niche: "Bebê",
    groups: ["Mães de Plantão"],
    sentAt: "15/03/2024 09:00",
    clicks: 0,
    sales: 0,
    commission: "R$ 0,00",
    conversion: "0%",
    status: "scheduled",
    isRecent: false,
    image: "https://picsum.photos/seed/baby1/400/400",
    score: 95,
    link: "https://magalu.com.br/pampers",
    message: "💥 OFERTA RELÂMPAGO\n\n⚡ Aproveite enquanto durar.\n\n📦 Fralda Pampers Premium G\n\n💰 Apenas R$ 89,90\n\n🛒 Comprar:\nhttps://mg.to/3afiliado"
  }
]

const templates = [
  {
    id: "t1",
    name: "Achadinho do Dia",
    content: "🔥 ACHADINHO DO DIA\n\n📦 {produto}\n\n💰 De: R$ {preco_anterior}\n🔥 Por: R$ {preco_atual}\n\n⭐ Avaliação: {avaliacao}\n\n🛒 Comprar:\n{link}"
  },
  {
    id: "t2",
    name: "Preço Caiu!",
    content: "🚨 PREÇO CAIU!\n\n📦 {produto}\n\n💸 Economia de {economia}\n\n🔥 Oferta encontrada agora:\n\n{preco_atual}\n\n🛒 Link:\n{link}"
  },
  {
    id: "t3",
    name: "Oferta Relâmpago",
    content: "💥 OFERTA RELÂMPAGO\n\n⚡ Aproveite enquanto durar.\n\n📦 {produto}\n\n💰 Apenas R$ {preco_atual}\n\n🛒 Comprar:\n{link}"
  },
  {
    id: "t4",
    name: "Utilidade Casa",
    content: "🏠 UTILIDADE QUE VALE CADA CENTAVO\n\n📦 {produto}\n\n✨ Avaliação: {avaliacao}\n\n🔥 Preço atual:\nR$ {preco_atual}\n\n🛒 Link:\n{link}"
  }
]

export default function DisparosPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = React.useState("history")
  const [selectedDisparo, setSelectedDisparo] = React.useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)

  const handleRowClick = (item: any) => {
    setSelectedDisparo(item)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-foreground">Disparos & Campanhas</h1>
          <p className="text-muted-foreground">Gerencie suas mensagens enviadas e biblioteca de modelos.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Nova Campanha
        </Button>
      </div>

      <Tabs defaultValue="history" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-card border w-full justify-start p-1 h-auto mb-6">
          <TabsTrigger value="history" className="rounded-md py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <History className="h-4 w-4 mr-2" /> Histórico de Envios
          </TabsTrigger>
          <TabsTrigger value="templates" className="rounded-md py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <LayoutTemplate className="h-4 w-4 mr-2" /> Modelos de Mensagem
          </TabsTrigger>
        </TabsList>

        {/* --- ABA 1: HISTÓRICO --- */}
        <TabsContent value="history" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Disparos Hoje" value="156" icon={<Send className="h-5 w-5 text-blue-600" />} />
            <MetricCard title="Cliques Gerados" value="12.845" icon={<MousePointer2 className="h-5 w-5 text-indigo-600" />} />
            <MetricCard title="Vendas Geradas" value="142" icon={<ShoppingCart className="h-5 w-5 text-emerald-600" />} />
            <MetricCard title="Comissões Geradas" value="R$ 2.450,00" icon={<DollarSign className="h-5 w-5 text-amber-600" />} />
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-xl border shadow-sm">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por produto ou grupo..." className="pl-9 bg-muted/20 border-none" />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] bg-muted/20 border-none">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="7days">7 dias</SelectItem>
                  <SelectItem value="30days">30 dias</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="shrink-0"><Filter className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="py-4 font-headline">Produto</TableHead>
                  <TableHead className="font-headline">Nicho</TableHead>
                  <TableHead className="font-headline">Grupo(s)</TableHead>
                  <TableHead className="font-headline">Data/Hora</TableHead>
                  <TableHead className="font-headline text-center">Cliques</TableHead>
                  <TableHead className="font-headline text-center">Vendas</TableHead>
                  <TableHead className="font-headline text-right">Comissão</TableHead>
                  <TableHead className="font-headline text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((item) => (
                  <TableRow key={item.id} className="group cursor-pointer hover:bg-muted/20 transition-colors" onClick={() => handleRowClick(item)}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.product}</div>
                        {item.isRecent && (
                          <span className="inline-flex items-center text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                            <AlertTriangle className="h-2.5 w-2.5 mr-1" /> ENVIADO RECENTEMENTE
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none text-[10px] uppercase font-bold">{item.niche}</Badge></TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {item.groups.map((g, i) => (
                          <div key={i} title={g} className="h-6 w-6 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-[8px] font-bold text-primary">
                            {g.charAt(0)}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.sentAt}</TableCell>
                    <TableCell className="text-center font-medium">{item.clicks}</TableCell>
                    <TableCell className="text-center font-medium">{item.sales}</TableCell>
                    <TableCell className="text-right font-bold text-emerald-600">{item.commission}</TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={item.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* --- ABA 2: MODELOS --- */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-headline font-bold">Biblioteca de Modelos</h2>
              <p className="text-sm text-muted-foreground">Estruturas de mensagem prontas para escala.</p>
            </div>
            <Button className="bg-primary shadow-lg shadow-primary/20"><Plus className="h-4 w-4 mr-2" /> Novo Modelo</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((template) => (
              <Card key={template.id} className="border-none shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold">{template.name}</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100"><MoreHorizontal className="h-4 w-4" /></Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <div className="bg-muted/10 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed border flex-1 mb-4">
                    {template.content}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 text-xs h-8"><Copy className="h-3 w-3 mr-1" /> Duplicar</Button>
                    <Button variant="secondary" className="flex-1 text-xs h-8">Editar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-dashed border-2 bg-transparent">
            <CardContent className="p-6">
              <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">Variáveis de Automação</h4>
              <div className="flex flex-wrap gap-2">
                {["produto", "preco_anterior", "preco_atual", "economia", "avaliacao", "vendas", "link", "nicho"].map(v => (
                  <Badge key={v} variant="secondary" className="font-mono text-[10px] bg-primary/5 text-primary border-primary/20">{`{${v}}`}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* DETALHES DO DISPARO MODAL */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedDisparo && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">Detalhes do Disparo</DialogTitle>
                <DialogDescription>Análise detalhada de performance e cópia enviada.</DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div className="aspect-square relative rounded-xl overflow-hidden bg-muted">
                    <Image src={selectedDisparo.image} alt={selectedDisparo.product} fill className="object-cover" />
                    <Badge className="absolute top-2 right-2 bg-primary">Score {selectedDisparo.score}</Badge>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl space-y-2">
                    <h4 className="font-bold text-sm">Informações</h4>
                    <p className="text-xs text-muted-foreground">{selectedDisparo.product}</p>
                    <Badge variant="outline" className="text-[10px]">{selectedDisparo.niche}</Badge>
                    <Button variant="link" className="p-0 h-auto text-xs text-primary" onClick={() => window.open(selectedDisparo.link)}>
                      <ExternalLink className="h-3 w-3 mr-1" /> Ver Oferta Original
                    </Button>
                  </div>
                </div>
                <div className="space-y-4 flex flex-col">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Mensagem Enviada</label>
                    <div className="bg-muted/50 p-3 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed border border-muted h-[200px] overflow-y-auto">
                      {selectedDisparo.message}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <ResultItem label="Cliques" value={selectedDisparo.clicks} icon={<MousePointer2 className="h-3 w-3" />} />
                    <ResultItem label="Vendas" value={selectedDisparo.sales} icon={<ShoppingCart className="h-3 w-3" />} />
                    <ResultItem label="Comissão" value={selectedDisparo.commission} icon={<DollarSign className="h-3 w-3" />} color="text-emerald-600" />
                    <ResultItem label="Conversão" value={selectedDisparo.conversion} icon={<TrendingUp className="h-3 w-3" />} color="text-primary" />
                  </div>
                </div>
              </div>
              {selectedDisparo.isRecent && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-xs font-medium">
                  <AlertTriangle className="h-4 w-4" /> ⚠ Oferta enviada recentemente para estes grupos.
                </div>
              )}
              <DialogFooter className="gap-2">
                <Button variant="ghost" className="text-xs"><RotateCcw className="h-4 w-4 mr-2" /> Reenviar</Button>
                <Button variant="secondary" className="text-xs"><Copy className="h-4 w-4 mr-2" /> Duplicar</Button>
                <Button className="bg-primary text-xs"><Send className="h-4 w-4 mr-2" /> Ver Oferta</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MetricCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card className="border-none shadow-sm group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/5 transition-colors">
            {icon}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
          <h3 className="text-2xl font-headline font-bold text-foreground mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "sent":
      return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[9px] font-bold">🟢 Enviado</Badge>
    case "scheduled":
      return <Badge className="bg-amber-50 text-amber-600 border-amber-200 text-[9px] font-bold">🟡 Agendado</Badge>
    case "failed":
      return <Badge className="bg-rose-50 text-rose-600 border-rose-200 text-[9px] font-bold">🔴 Falhou</Badge>
    default:
      return null
  }
}

function ResultItem({ label, value, icon, color = "text-foreground" }: any) {
  return (
    <div className="p-2 bg-background rounded-lg border border-muted flex flex-col items-center justify-center text-center">
      <span className="text-[9px] uppercase font-bold text-muted-foreground mb-1 flex items-center gap-1">
        {icon} {label}
      </span>
      <span className={cn("text-sm font-bold", color)}>{value}</span>
    </div>
  )
}
