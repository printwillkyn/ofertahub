
"use client"

import * as React from "react"
import { 
  MousePointer2, 
  ShoppingCart, 
  DollarSign, 
  Zap,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Send
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import Link from "next/link"

const bestOpportunities = [
  {
    id: "1",
    product: "iPhone 15 Pro Max 256GB",
    niche: "Eletrônicos",
    price: "R$ 8.499,00",
    score: 98,
    commission: "R$ 254,97"
  },
  {
    id: "2",
    product: "Kindle Paperwhite 16GB",
    niche: "Educação",
    price: "R$ 699,00",
    score: 95,
    commission: "R$ 41,94"
  },
  {
    id: "3",
    product: "Fritadeira Philips Walita",
    niche: "Casa",
    price: "R$ 449,90",
    score: 92,
    commission: "R$ 31,49"
  },
  {
    id: "4",
    product: "Console PlayStation 5 Slim",
    niche: "Games",
    price: "R$ 3.699,00",
    score: 89,
    commission: "R$ 110,97"
  }
]

const lastSentOffers = [
  {
    id: "1",
    product: "Smart TV Samsung 55' UHD",
    group: "Ofertas Tech Brasil",
    time: "Hoje, 14:20",
    status: "success"
  },
  {
    id: "2",
    product: "Airfryer Philco Gourmet",
    group: "Casa & Cozinha VIP",
    time: "Hoje, 09:15",
    status: "success"
  },
  {
    id: "3",
    product: "Mouse Logitech G502",
    group: "Gamers Brasil",
    time: "Ontem, 21:00",
    status: "error"
  }
]

export default function DashboardPage() {
  const [period, setPeriod] = React.useState("30")

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-foreground">Inteligência de Vendas</h1>
          <p className="text-muted-foreground">Monitore sua performance e comissões geradas.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Período:</span>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px] bg-card border-none shadow-sm font-medium">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Hoje</SelectItem>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="month">Mês Atual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Cliques */}
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                <MousePointer2 className="h-6 w-6 text-blue-600" />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Cliques nos Links</p>
              <h3 className="text-3xl font-headline font-bold text-foreground mt-1">12.845</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Total de acessos via links afiliados</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Produtos Vendidos */}
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                <ShoppingCart className="h-6 w-6 text-indigo-600" />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +8.2%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Produtos Vendidos</p>
              <h3 className="text-3xl font-headline font-bold text-foreground mt-1">842</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Conversões diretas confirmadas</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Comissões Geradas */}
        <Card className="border-none shadow-sm border-l-4 border-l-primary hover:shadow-md transition-shadow bg-primary/5 group overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <DollarSign className="h-6 w-6" />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded-full">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +15.4%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Comissões Geradas</p>
              <h3 className="text-3xl font-headline font-bold text-foreground mt-1">R$ 14.250,80</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Valor total estimado de receita</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Ofertas Encontradas */}
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-amber-50 group-hover:bg-amber-100 transition-colors">
                <Zap className="h-6 w-6 text-amber-600 fill-amber-600" />
              </div>
              <Badge variant="outline" className="text-[10px] font-bold border-amber-200 text-amber-700 bg-amber-50">
                AI ACTIVE
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Ofertas Hoje</p>
              <h3 className="text-3xl font-headline font-bold text-foreground mt-1">156</h3>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">42 prontas para envio imediato</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* SEÇÃO 1: Melhores Oportunidades do Dia */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-headline font-bold text-foreground">Melhores Oportunidades do Dia</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-bold text-xs" asChild>
              <Link href="/offers">
                Ver Todas <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
          <Card className="border-none shadow-sm overflow-hidden bg-card">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-headline py-4">Produto</TableHead>
                  <TableHead className="font-headline">Nicho</TableHead>
                  <TableHead className="font-headline">Preço Atual</TableHead>
                  <TableHead className="font-headline text-center">Score</TableHead>
                  <TableHead className="font-headline text-right">Comissão Estimada</TableHead>
                  <TableHead className="w-[120px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bestOpportunities.map((item) => (
                  <TableRow key={item.id} className="group hover:bg-muted/10 transition-colors">
                    <TableCell className="font-semibold py-4 max-w-[200px] truncate">{item.product}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none text-[10px] uppercase font-bold">
                        {item.niche}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-muted-foreground">{item.price}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <div className={cn(
                          "flex items-center justify-center h-8 w-8 rounded-full text-[10px] font-bold border-2",
                          item.score > 90 ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "border-amber-500 text-amber-600 bg-amber-50"
                        )}>
                          {item.score}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold text-primary">{item.commission}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80 font-bold text-xs">
                        Ver Oferta <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* SEÇÃO 2: Últimas Ofertas Enviadas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Send className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-headline font-bold text-foreground">Últimos Envios</h2>
          </div>
          <Card className="border-none shadow-sm overflow-hidden bg-card h-full">
            <div className="divide-y divide-muted/30">
              {lastSentOffers.map((offer) => (
                <div key={offer.id} className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-sm text-foreground line-clamp-1 flex-1">{offer.product}</h3>
                    {offer.status === "success" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 ml-2 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-rose-500 ml-2 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-medium">{offer.group}</span>
                    <span className="font-semibold">{offer.time}</span>
                  </div>
                  <div className="mt-2">
                    <Badge className={cn(
                      "text-[9px] font-bold uppercase py-0 px-1.5",
                      offer.status === "success" ? "bg-emerald-50 text-emerald-600 border-none" : "bg-rose-50 text-rose-600 border-none"
                    )}>
                      {offer.status === "success" ? "Enviada" : "Erro"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-muted/10">
              <Button variant="outline" className="w-full text-xs font-bold border-none bg-card shadow-sm h-9 hover:bg-muted/20" asChild>
                <Link href="/history">
                  Ver Todos os Disparos
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
