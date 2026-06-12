
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
  MousePointer2,
  TrendingUp
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
import { supabase } from "@/lib/supabase"
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

type SendHistory = {
  id: string
  offerId: string
  groupId: string
  offerTitle: string
  groupName: string
  niche: string
  channel: string
  message: string
  status: string
  sentAt: string
  sentAtRaw: string
  createdAt: string
  product: string
  groups: string[]
  clicks: number
  sales: number
  commission: string
  conversion: string
  isRecent: boolean
  image: string
  score: number
  link: string
}

type SendHistoryRow = {
  id: string
  offer_id: string | null
  group_id: string | null
  offer_title: string | null
  group_name: string | null
  niche: string | null
  channel: string | null
  message: string | null
  status: string | null
  sent_at: string | null
  created_at: string | null
}

type Campaign = {
  id: string
  miningRunId: string
  offerId: string
  name: string
  offerTitle: string
  niche: string
  message: string
  messageModel: string
  selectedGroups: any[]
  source: string
  status: string
  scheduledAt: string
  sentAt: string
  createdAt: string
}

type CampaignRow = {
  id: string
  mining_run_id: string | null
  offer_id: string | null
  name: string | null
  offer_title: string | null
  niche: string | null
  message: string | null
  message_model: string | null
  selected_groups: any
  source: string | null
  status: string | null
  scheduled_at: string | null
  sent_at: string | null
  created_at: string | null
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
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date)
}

const isRecentSend = (value: string | null) => {
  if (!value) {
    return false
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return false
  }

  return Date.now() - date.getTime() < 24 * 60 * 60 * 1000
}

const mapHistoryFromSupabase = (item: SendHistoryRow): SendHistory => ({
  id: item.id,
  offerId: item.offer_id ?? "",
  groupId: item.group_id ?? "",
  offerTitle: item.offer_title ?? "",
  groupName: item.group_name ?? "",
  niche: item.niche ?? "",
  channel: item.channel ?? "",
  message: item.message ?? "",
  status: item.status ?? "sent",
  sentAt: formatDateTime(item.sent_at),
  sentAtRaw: item.sent_at ?? "",
  createdAt: item.created_at ?? "",
  product: item.offer_title ?? "Oferta sem título",
  groups: item.group_name ? [item.group_name] : [],
  clicks: 0,
  sales: 0,
  commission: "R$ 0,00",
  conversion: "0%",
  isRecent: isRecentSend(item.sent_at),
  image: `https://picsum.photos/seed/${item.id}/400/400`,
  score: 0,
  link: "",
})

const parseSelectedGroups = (value: any) => {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  return []
}

const mapCampaignFromSupabase = (item: CampaignRow): Campaign => ({
  id: item.id,
  miningRunId: item.mining_run_id ?? "",
  offerId: item.offer_id ?? "",
  name: item.name ?? "",
  offerTitle: item.offer_title ?? "",
  niche: item.niche ?? "",
  message: item.message ?? "",
  messageModel: item.message_model ?? "",
  selectedGroups: parseSelectedGroups(item.selected_groups),
  source: item.source ?? "",
  status: item.status ?? "",
  scheduledAt: formatDateTime(item.scheduled_at),
  sentAt: formatDateTime(item.sent_at),
  createdAt: formatDateTime(item.created_at),
})

export default function DisparosPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = React.useState("history")
  const [historyRecords, setHistoryRecords] = React.useState<SendHistory[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = React.useState(true)
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])
  const [isLoadingCampaigns, setIsLoadingCampaigns] = React.useState(true)
  const [isMining, setIsMining] = React.useState(false)
  const [processingCampaignId, setProcessingCampaignId] = React.useState<string | null>(null)
  const [campaignActionType, setCampaignActionType] = React.useState<"approve" | "reject" | null>(null)
  const [campaignPendingAction, setCampaignPendingAction] = React.useState<Campaign | null>(null)
  const [selectedDisparo, setSelectedDisparo] = React.useState<SendHistory | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)

  const loadHistory = React.useCallback(async () => {
    setIsLoadingHistory(true)

    const { data, error } = await supabase
      .from("send_history")
      .select("id, offer_id, group_id, offer_title, group_name, niche, channel, message, status, sent_at, created_at")
      .order("sent_at", { ascending: false })

    if (error) {
      toast({
        title: "Erro ao carregar histórico",
        description: error.message,
        variant: "destructive"
      })
      setIsLoadingHistory(false)
      return
    }

    setHistoryRecords((data ?? []).map(mapHistoryFromSupabase))
    setIsLoadingHistory(false)
  }, [toast])

  const loadCampaigns = React.useCallback(async () => {
    setIsLoadingCampaigns(true)

    const { data, error } = await supabase
      .from("campaigns")
      .select("id, mining_run_id, offer_id, name, offer_title, niche, message, message_model, selected_groups, source, status, scheduled_at, sent_at, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      toast({
        title: "Erro ao carregar campanhas",
        description: error.message,
        variant: "destructive"
      })
      setIsLoadingCampaigns(false)
      return
    }

    setCampaigns((data ?? []).map(mapCampaignFromSupabase))
    setIsLoadingCampaigns(false)
  }, [toast])

  React.useEffect(() => {
    loadHistory()
    loadCampaigns()
  }, [loadHistory, loadCampaigns])

  const handleRowClick = (item: SendHistory) => {
    setSelectedDisparo(item)
    setIsDetailsOpen(true)
  }

  const handleMineOffers = async () => {
    setIsMining(true)

    try {
      const response = await fetch("/api/miner/run", { method: "POST" })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Não foi possível executar o minerador.")
      }

      await Promise.all([loadCampaigns(), loadHistory()])
      toast({
        title: "Minerador finalizado",
        description: "Uma oferta foi minerada e a campanha automática foi criada."
      })
    } catch (error) {
      toast({
        title: "Erro ao executar minerador",
        description: error instanceof Error ? error.message : "Não foi possível executar o minerador.",
        variant: "destructive"
      })
    } finally {
      setIsMining(false)
    }
  }

  const isPendingCampaign = (status: string) => status.trim().toLowerCase() === "aguardando aprovação"

  const getCampaignStatusClass = (status: string) => {
    const normalizedStatus = status.trim().toLowerCase()

    if (["enviada", "aprovada"].includes(normalizedStatus)) {
      return "bg-emerald-50 text-emerald-600 border-emerald-200 text-[9px] font-bold"
    }

    if (["rejeitada", "negada", "recusada"].includes(normalizedStatus)) {
      return "bg-rose-50 text-rose-600 border-rose-200 text-[9px] font-bold"
    }

    return "bg-amber-50 text-amber-700 border-amber-200 text-[9px] font-bold"
  }

  const openCampaignActionDialog = (campaign: Campaign, actionType: "approve" | "reject") => {
    setCampaignPendingAction(campaign)
    setCampaignActionType(actionType)
  }

  const closeCampaignActionDialog = () => {
    if (processingCampaignId) {
      return
    }

    setCampaignPendingAction(null)
    setCampaignActionType(null)
  }

  const rejectCampaign = async (campaign: Campaign) => {
    setProcessingCampaignId(campaign.id)

    const { error } = await supabase
      .from("campaigns")
      .update({ status: "Rejeitada" })
      .eq("id", campaign.id)

    if (error) {
      toast({
        title: "Erro ao rejeitar campanha",
        description: error.message,
        variant: "destructive"
      })
      setProcessingCampaignId(null)
      return
    }

    await loadCampaigns()
    toast({
      title: "Campanha rejeitada"
    })
    setProcessingCampaignId(null)
    setCampaignPendingAction(null)
    setCampaignActionType(null)
  }

  const approveCampaign = async (campaign: Campaign) => {
    if (campaign.selectedGroups.length === 0) {
      toast({
        title: "Nenhum grupo selecionado para esta campanha",
        variant: "destructive"
      })
      return
    }

    setProcessingCampaignId(campaign.id)

    const sentAt = new Date().toISOString()
    const historyRows = campaign.selectedGroups.map((group) => ({
      offer_id: campaign.offerId,
      group_id: group?.id ?? null,
      offer_title: campaign.offerTitle,
      group_name: group?.name ?? "",
      niche: campaign.niche,
      channel: "WhatsApp",
      message: campaign.message,
      status: "Enviado",
      sent_at: sentAt
    }))

    const { error: historyError } = await supabase
      .from("send_history")
      .insert(historyRows)

    if (historyError) {
      toast({
        title: "Erro ao registrar envio",
        description: historyError.message,
        variant: "destructive"
      })
      setProcessingCampaignId(null)
      return
    }

    const { error: campaignError } = await supabase
      .from("campaigns")
      .update({
        status: "Enviada",
        sent_at: sentAt
      })
      .eq("id", campaign.id)

    if (campaignError) {
      toast({
        title: "Erro ao atualizar campanha",
        description: campaignError.message,
        variant: "destructive"
      })
      setProcessingCampaignId(null)
      return
    }

    await Promise.all([loadCampaigns(), loadHistory()])
    toast({
      title: "Campanha enviada"
    })
    setProcessingCampaignId(null)
    setCampaignPendingAction(null)
    setCampaignActionType(null)
  }

  const handleConfirmCampaignAction = async () => {
    if (!campaignPendingAction || !campaignActionType) {
      return
    }

    if (campaignActionType === "approve") {
      await approveCampaign(campaignPendingAction)
      return
    }

    await rejectCampaign(campaignPendingAction)
  }

  const today = new Date()
  const sentTodayCount = historyRecords.filter((item) => {
    if (!item.sentAtRaw) {
      return false
    }

    const sentAt = new Date(item.sentAtRaw)

    if (Number.isNaN(sentAt.getTime())) {
      return false
    }

    return (
      sentAt.getFullYear() === today.getFullYear() &&
      sentAt.getMonth() === today.getMonth() &&
      sentAt.getDate() === today.getDate()
    )
  }).length

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-foreground">Bot Minerador de Ofertas</h1>
          <p className="text-muted-foreground">Minere ofertas, gere campanhas automáticas e acompanhe os envios.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20" onClick={handleMineOffers} disabled={isMining}>
          <Plus className="mr-2 h-4 w-4" /> {isMining ? "Minerando..." : "Minerar Ofertas"}
        </Button>
      </div>

      <Tabs defaultValue="history" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-card border w-full justify-start p-1 h-auto mb-6">
          <TabsTrigger value="history" className="rounded-md py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <History className="h-4 w-4 mr-2" /> Campanhas do Bot
          </TabsTrigger>
          <TabsTrigger value="templates" className="rounded-md py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <LayoutTemplate className="h-4 w-4 mr-2" /> Modelos de Mensagem
          </TabsTrigger>
        </TabsList>

        {/* --- ABA 1: CAMPANHAS --- */}
        <TabsContent value="history" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Disparos Hoje" value={String(sentTodayCount)} icon={<Send className="h-5 w-5 text-blue-600" />} />
            <MetricCard title="Cliques Gerados" value="0" icon={<MousePointer2 className="h-5 w-5 text-indigo-600" />} />
            <MetricCard title="Vendas Geradas" value="0" icon={<ShoppingCart className="h-5 w-5 text-emerald-600" />} />
            <MetricCard title="Comissões Geradas" value="R$ 0,00" icon={<DollarSign className="h-5 w-5 text-amber-600" />} />
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
                  <TableHead className="py-4 font-headline">Campanha</TableHead>
                  <TableHead className="font-headline">Oferta</TableHead>
                  <TableHead className="font-headline">Nicho</TableHead>
                  <TableHead className="font-headline text-center">Status</TableHead>
                  <TableHead className="font-headline text-center">Origem</TableHead>
                  <TableHead className="font-headline text-center">Grupos</TableHead>
                  <TableHead className="font-headline text-right">Criada em</TableHead>
                  <TableHead className="font-headline text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingCampaigns ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      Carregando campanhas...
                    </TableCell>
                  </TableRow>
                ) : campaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      Nenhuma campanha criada ainda.
                    </TableCell>
                  </TableRow>
                ) : campaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="group hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{campaign.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono uppercase">{campaign.messageModel}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{campaign.offerTitle}</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none text-[10px] uppercase font-bold">{campaign.niche}</Badge></TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className={getCampaignStatusClass(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-[10px] uppercase font-bold">{campaign.source}</Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">{campaign.selectedGroups.length}</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">{campaign.createdAt}</TableCell>
                    <TableCell className="text-right">
                      {isPendingCampaign(campaign.status) ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            className="h-8 text-xs bg-primary"
                            disabled={processingCampaignId === campaign.id}
                            onClick={() => openCampaignActionDialog(campaign, "approve")}
                          >
                            Aprovar/Enviar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-xs"
                            disabled={processingCampaignId === campaign.id}
                            onClick={() => openCampaignActionDialog(campaign, "reject")}
                          >
                            Negar
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="py-4 font-headline">Últimos Envios</TableHead>
                  <TableHead className="font-headline">Nicho</TableHead>
                  <TableHead className="font-headline">Grupo(s)</TableHead>
                  <TableHead className="font-headline">Data/Hora</TableHead>
                  <TableHead className="font-headline text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingHistory ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                      Carregando histórico...
                    </TableCell>
                  </TableRow>
                ) : historyRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                      Nenhum envio encontrado.
                    </TableCell>
                  </TableRow>
                ) : historyRecords.slice(0, 5).map((item) => (
                  <TableRow key={item.id} className="group cursor-pointer hover:bg-muted/20 transition-colors" onClick={() => handleRowClick(item)}>
                    <TableCell>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.product}</div>
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

      <Dialog open={!!campaignActionType && !!campaignPendingAction} onOpenChange={(open) => {
        if (!open) {
          closeCampaignActionDialog()
        }
      }}>
        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">
              {campaignActionType === "approve" ? "Aprovar campanha?" : "Negar campanha?"}
            </DialogTitle>
            <DialogDescription>
              {campaignActionType === "approve"
                ? "Essa ação vai registrar o envio desta campanha para os grupos selecionados."
                : "Essa campanha será marcada como rejeitada e não será enviada."}
            </DialogDescription>
          </DialogHeader>
          {campaignPendingAction && (
            <div className="rounded-lg border bg-muted/30 p-4 space-y-1">
              <p className="text-sm font-bold">{campaignPendingAction.name}</p>
              <p className="text-xs text-muted-foreground">{campaignPendingAction.offerTitle}</p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={closeCampaignActionDialog} disabled={!!processingCampaignId}>
              Cancelar
            </Button>
            <Button
              className={cn(campaignActionType === "reject" && "bg-destructive hover:bg-destructive/90")}
              onClick={handleConfirmCampaignAction}
              disabled={!!processingCampaignId}
            >
              {processingCampaignId
                ? campaignActionType === "approve" ? "Enviando..." : "Negando..."
                : campaignActionType === "approve" ? "Aprovar e enviar" : "Negar campanha"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
  switch (status.trim().toLowerCase()) {
    case "sent":
    case "enviado":
    case "enviada":
      return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[9px] font-bold">🟢 Enviado</Badge>
    case "rejeitada":
    case "rejeitado":
      return <Badge className="bg-rose-50 text-rose-600 border-rose-200 text-[9px] font-bold">Rejeitada</Badge>
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
