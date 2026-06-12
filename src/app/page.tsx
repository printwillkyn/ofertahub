
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
  Send,
  BarChart3,
  LayoutTemplate
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import Link from "next/link"

const chartData = [
  { period: "01/03", value: 0 },
  { period: "05/03", value: 0 },
  { period: "10/03", value: 0 },
  { period: "15/03", value: 0 },
  { period: "20/03", value: 0 },
  { period: "25/03", value: 0 },
  { period: "30/03", value: 0 },
]

type Offer = {
  id: string
  title: string | null
  niche: string | null
  price: string | null
  score: number | null
}

type Campaign = {
  id: string
  name: string | null
  offer_title: string | null
  status: string | null
  created_at: string | null
}

type SendHistory = {
  id: string
  offer_title: string | null
  group_name: string | null
  status: string | null
  sent_at: string | null
}

const formatDateTime = (value: string | null) => {
  if (!value) {
    return "-"
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date)
}

export default function DashboardPage() {
  const { toast } = useToast()
  const [period, setPeriod] = React.useState("30")
  const [isLoading, setIsLoading] = React.useState(true)
  const [metrics, setMetrics] = React.useState({
    offersToday: 0
  })
  const [latestOffers, setLatestOffers] = React.useState<Offer[]>([])
  const [recentCampaigns, setRecentCampaigns] = React.useState<Campaign[]>([])
  const [latestSends, setLatestSends] = React.useState<SendHistory[]>([])

  React.useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true)

      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)

      const tomorrowStart = new Date(todayStart)
      tomorrowStart.setDate(tomorrowStart.getDate() + 1)

      const [
        offersTodayResult,
        latestOffersResult,
        recentCampaignsResult,
        latestSendsResult
      ] = await Promise.all([
        supabase
          .from("offers")
          .select("id", { count: "exact", head: true })
          .gte("created_at", todayStart.toISOString())
          .lt("created_at", tomorrowStart.toISOString()),
        supabase
          .from("offers")
          .select("id, title, niche, price, score")
          .order("created_at", { ascending: false })
          .limit(4),
        supabase
          .from("campaigns")
          .select("id, name, offer_title, status, created_at")
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("send_history")
          .select("id, offer_title, group_name, status, sent_at")
          .order("sent_at", { ascending: false })
          .limit(5)
      ])

      const firstError = [
        offersTodayResult.error,
        latestOffersResult.error,
        recentCampaignsResult.error,
        latestSendsResult.error
      ].find(Boolean)

      if (firstError) {
        toast({
          title: "Erro ao carregar dashboard",
          description: firstError.message,
          variant: "destructive"
        })
        setIsLoading(false)
        return
      }

      setMetrics({
        offersToday: offersTodayResult.count ?? 0
      })
      setLatestOffers((latestOffersResult.data ?? []) as Offer[])
      setRecentCampaigns((recentCampaignsResult.data ?? []) as Campaign[])
      setLatestSends((latestSendsResult.data ?? []) as SendHistory[])
      setIsLoading(false)
    }

    loadDashboard()
  }, [toast])

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
              <span className="flex items-center text-xs font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 0%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Cliques nos Links</p>
              <h3 className="text-3xl font-headline font-bold text-foreground mt-1">0</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Rastreamento de cliques ainda não configurado</p>
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
              <span className="flex items-center text-xs font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 0%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Produtos Vendidos</p>
              <h3 className="text-3xl font-headline font-bold text-foreground mt-1">0</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Rastreamento de vendas ainda não configurado</p>
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
              <span className="flex items-center text-xs font-bold text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 0%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Comissões Geradas</p>
              <h3 className="text-3xl font-headline font-bold text-foreground mt-1">R$ 0,00</h3>
              <p className="text-[10px] text-muted-foreground mt-1">Rastreamento de comissão ainda não configurado</p>
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
              <h3 className="text-3xl font-headline font-bold text-foreground mt-1">{isLoading ? "..." : metrics.offersToday}</h3>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">{isLoading ? "..." : metrics.offersToday} prontas para envio imediato</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEÇÃO DE INTELIGÊNCIA FINANCEIRA */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-none shadow-sm bg-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-headline">Comissões por Período</CardTitle>
            </div>
            <CardDescription>Visualização temporal de ganhos estimados e conversão.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-headline">Campanhas Recentes</CardTitle>
            </div>
            <CardDescription>Últimas campanhas criadas no Supabase.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Campanha</TableHead>
                  <TableHead className="text-right text-[10px] font-bold uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={2} className="h-20 text-center text-xs text-muted-foreground">Carregando...</TableCell>
                  </TableRow>
                ) : recentCampaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="h-20 text-center text-xs text-muted-foreground">Nenhuma campanha encontrada.</TableCell>
                  </TableRow>
                ) : recentCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-muted/10 border-muted/20">
                    <TableCell className="text-xs font-semibold py-4">
                      <div className="space-y-1">
                        <p className="line-clamp-1">{campaign.name ?? campaign.offer_title ?? "Campanha sem nome"}</p>
                        <p className="text-[10px] text-muted-foreground">{formatDateTime(campaign.created_at)}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none text-[10px] font-bold">
                        {campaign.status ?? "Sem status"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* SEÇÃO 1: Últimas Ofertas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-headline font-bold text-foreground">Últimas Ofertas</h2>
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">Carregando ofertas...</TableCell>
                  </TableRow>
                ) : latestOffers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">Nenhuma oferta encontrada.</TableCell>
                  </TableRow>
                ) : latestOffers.map((item) => (
                  <TableRow key={item.id} className="group hover:bg-muted/10 transition-colors">
                    <TableCell className="font-semibold py-4 max-w-[200px] truncate">{item.title ?? "Oferta sem título"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none text-[10px] uppercase font-bold">
                        {item.niche ?? "Sem nicho"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-muted-foreground">{item.price ?? "-"}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <div className={cn(
                          "flex items-center justify-center h-8 w-8 rounded-full text-[10px] font-bold border-2",
                          (item.score ?? 0) > 90 ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "border-amber-500 text-amber-600 bg-amber-50"
                        )}>
                          {item.score ?? 0}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold text-primary">R$ 0,00</TableCell>
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
              {isLoading ? (
                <div className="p-6 text-center text-sm text-muted-foreground">Carregando envios...</div>
              ) : latestSends.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">Nenhum envio encontrado.</div>
              ) : latestSends.map((offer) => (
                <div key={offer.id} className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-sm text-foreground line-clamp-1 flex-1">{offer.offer_title ?? "Envio sem título"}</h3>
                    {(offer.status ?? "").toLowerCase() === "enviado" || (offer.status ?? "").toLowerCase() === "sent" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 ml-2 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-rose-500 ml-2 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-medium">{offer.group_name ?? "Sem grupo"}</span>
                    <span className="font-semibold">{formatDateTime(offer.sent_at)}</span>
                  </div>
                  <div className="mt-2">
                    <Badge className={cn(
                      "text-[9px] font-bold uppercase py-0 px-1.5",
                      (offer.status ?? "").toLowerCase() === "enviado" || (offer.status ?? "").toLowerCase() === "sent"
                        ? "bg-emerald-50 text-emerald-600 border-none"
                        : "bg-rose-50 text-rose-600 border-none"
                    )}>
                      {offer.status ?? "Sem status"}
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
