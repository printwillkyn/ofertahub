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
  Activity,
  Trash2,
  Loader2
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
import { supabase } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type Group = {
  id: string
  name: string
  niche: string
  platform: string
  inviteLink: string
  membersCount: number
  status: string
  description: string
  createdAt: string
}

type GroupForm = {
  name: string
  platform: string
  inviteLink: string
  membersCount: string
  status: string
  description: string
  niches: string[]
}

type GroupRow = {
  id: string
  name: string | null
  niche: string | null
  platform: string | null
  invite_link: string | null
  members_count: number | null
  status: string | null
  description: string | null
  created_at: string | null
}

const nichesList = [
  "Casa", "Cozinha", "Organização", "Limpeza", "Bebê", "Utilidades"
]

const emptyForm: GroupForm = {
  name: "",
  platform: "WhatsApp",
  inviteLink: "",
  membersCount: "",
  status: "connected",
  description: "",
  niches: []
}

const mapGroupFromSupabase = (group: GroupRow): Group => ({
  id: group.id,
  name: group.name ?? "",
  niche: group.niche ?? "",
  platform: group.platform ?? "WhatsApp",
  inviteLink: group.invite_link ?? "",
  membersCount: group.members_count ?? 0,
  status: group.status ?? "connected",
  description: group.description ?? "",
  createdAt: group.created_at ?? ""
})

const splitNiches = (niche: string) => niche
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean)

export default function DistributionPage() {
  const [groups, setGroups] = React.useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = React.useState<Group | null>(null)
  const [isConfigOpen, setIsConfigOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSaving, setIsSaving] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<GroupForm>(emptyForm)

  const loadGroups = React.useCallback(async () => {
    setIsLoading(true)

    const { data, error } = await supabase
      .from("groups")
      .select("id, name, niche, platform, invite_link, members_count, status, description, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      toast({
        title: "Erro ao carregar grupos",
        description: error.message,
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    setGroups((data ?? []).map(mapGroupFromSupabase))
    toast({
      title: "Grupos carregados",
      description: "A lista de grupos foi atualizada com sucesso."
    })
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    loadGroups()
  }, [loadGroups])

  const handleOpenConfig = (group: Group | null) => {
    setSelectedGroup(group)
    setForm(group ? {
      name: group.name,
      platform: group.platform,
      inviteLink: group.inviteLink,
      membersCount: String(group.membersCount || ""),
      status: group.status,
      description: group.description,
      niches: splitNiches(group.niche)
    } : emptyForm)
    setIsConfigOpen(true)
  }

  const handleDialogChange = (open: boolean) => {
    setIsConfigOpen(open)

    if (!open) {
      setSelectedGroup(null)
      setForm(emptyForm)
    }
  }

  const updateForm = (field: keyof GroupForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const toggleNiche = (niche: string, checked: boolean) => {
    setForm((current) => ({
      ...current,
      niches: checked
        ? [...current.niches, niche]
        : current.niches.filter((item) => item !== niche)
    }))
  }

  const handleSaveGroup = async () => {
    if (!form.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Informe o nome do grupo antes de salvar.",
        variant: "destructive"
      })
      return
    }

    setIsSaving(true)

    const payload = {
      name: form.name.trim(),
      niche: form.niches.join(", "),
      platform: form.platform.trim() || "WhatsApp",
      invite_link: form.inviteLink.trim(),
      members_count: Number(form.membersCount) || 0,
      status: form.status,
      description: form.description.trim()
    }

    const query = selectedGroup
      ? supabase
          .from("groups")
          .update(payload)
          .eq("id", selectedGroup.id)
          .select("id, name, niche, platform, invite_link, members_count, status, description, created_at")
          .single()
      : supabase
          .from("groups")
          .insert(payload)
          .select("id, name, niche, platform, invite_link, members_count, status, description, created_at")
          .single()

    const { data, error } = await query

    if (error) {
      toast({
        title: selectedGroup ? "Erro ao atualizar grupo" : "Erro ao cadastrar grupo",
        description: error.message,
        variant: "destructive"
      })
      setIsSaving(false)
      return
    }

    const savedGroup = mapGroupFromSupabase(data)

    setGroups((current) => {
      if (selectedGroup) {
        return current.map((group) => group.id === savedGroup.id ? savedGroup : group)
      }

      return [savedGroup, ...current]
    })
    toast({
      title: selectedGroup ? "Grupo atualizado" : "Grupo cadastrado",
      description: `${savedGroup.name} foi salvo com sucesso.`
    })
    setIsSaving(false)
    handleDialogChange(false)
  }

  const handleDeleteGroup = async (group: Group) => {
    setDeletingId(group.id)

    const { error } = await supabase
      .from("groups")
      .delete()
      .eq("id", group.id)

    if (error) {
      toast({
        title: "Erro ao excluir grupo",
        description: error.message,
        variant: "destructive"
      })
      setDeletingId(null)
      return
    }

    setGroups((current) => current.filter((item) => item.id !== group.id))
    toast({
      title: "Grupo excluído",
      description: `${group.name} foi removido com sucesso.`
    })
    setDeletingId(null)
  }

  const activeGroups = groups.filter((group) => group.status === "connected").length
  const monitoredNiches = new Set(groups.flatMap((group) => splitNiches(group.niche))).size

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
        <MetricCard title="Grupos Ativos" value={String(activeGroups)} icon={<Users className="h-5 w-5 text-blue-600" />} />
        <MetricCard title="Grupos Conectados" value={String(activeGroups)} icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />} />
        <MetricCard title="Disparos Hoje" value="0" icon={<Zap className="h-5 w-5 text-amber-600" />} />
        <MetricCard title="Nichos Monitorados" value={String(monitoredNiches).padStart(2, "0")} icon={<Activity className="h-5 w-5 text-indigo-600" />} />
      </div>

      {/* CARDS DOS GRUPOS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <Card className="border-none shadow-sm bg-card md:col-span-2 lg:col-span-3">
            <CardContent className="p-10 flex items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Carregando grupos...
            </CardContent>
          </Card>
        ) : groups.length === 0 ? (
          <Card className="border-none shadow-sm bg-card md:col-span-2 lg:col-span-3">
            <CardContent className="p-10 text-center text-muted-foreground">
              Nenhum grupo cadastrado ainda.
            </CardContent>
          </Card>
        ) : groups.map((group) => (
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
                    {group.inviteLink || group.platform}
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
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Plataforma</p>
                  <p className="text-xs font-medium text-foreground">{group.platform}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Membros</p>
                  <p className="text-xs font-bold text-primary">{group.membersCount} membros</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Nichos Vinculados</p>
                <div className="flex flex-wrap gap-1.5">
                  {splitNiches(group.niche).length > 0 ? splitNiches(group.niche).map((niche) => (
                    <Badge key={niche} variant="secondary" className="bg-muted/50 text-muted-foreground border-none text-[9px] uppercase font-bold tracking-tight px-1.5 py-0">
                      {niche}
                    </Badge>
                  )) : (
                    <Badge variant="secondary" className="bg-muted/50 text-muted-foreground border-none text-[9px] uppercase font-bold tracking-tight px-1.5 py-0">
                      Sem nicho
                    </Badge>
                  )}
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
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:bg-destructive/5"
                  disabled={deletingId === group.id}
                  onClick={() => handleDeleteGroup(group)}
                >
                  {deletingId === group.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary h-8 text-xs font-bold hover:bg-primary/5"
                  onClick={() => handleOpenConfig(group)}
                >
                  <Settings2 className="h-3.5 w-3.5 mr-1" /> Configurar
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* CONFIGURAR GRUPO MODAL */}
      <Dialog open={isConfigOpen} onOpenChange={handleDialogChange}>
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
                    <Input value={form.name} onChange={(event) => updateForm("name", event.target.value)} placeholder="Ex: Ofertas VIP Casa" />
                  </div>
                  <div className="space-y-2">
                    <Label>Plataforma</Label>
                    <Input value={form.platform} onChange={(event) => updateForm("platform", event.target.value)} placeholder="WhatsApp" />
                  </div>
                  <div className="space-y-2">
                    <Label>Link de Convite</Label>
                    <Input value={form.inviteLink} onChange={(event) => updateForm("inviteLink", event.target.value)} placeholder="https://chat.whatsapp.com/..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Total de Membros</Label>
                    <Input type="number" min="0" value={form.membersCount} onChange={(event) => updateForm("membersCount", event.target.value)} placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex items-center space-x-2 h-10">
                      <Checkbox
                        id="group-status"
                        checked={form.status === "connected"}
                        onCheckedChange={(checked) => updateForm("status", checked ? "connected" : "disconnected")}
                      />
                      <Label htmlFor="group-status">Grupo conectado</Label>
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Descrição Interna</Label>
                    <Textarea value={form.description} onChange={(event) => updateForm("description", event.target.value)} placeholder="Para controle da sua equipe..." className="h-20 resize-none" />
                  </div>
                </div>
              </div>

              {/* SEÇÃO 2 - Nichos Permitidos */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Hash className="h-4 w-4" /> 2. Nichos Permitidos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {nichesList.map((niche) => (
                    <div key={niche} className="flex items-center space-x-2">
                      <Checkbox
                        id={`niche-${niche}`}
                        checked={form.niches.includes(niche)}
                        onCheckedChange={(checked) => toggleNiche(niche, checked === true)}
                      />
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
                  {nichesList.map((niche) => (
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
                <div className="flex flex-wrap gap-4">
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
            <Button variant="ghost" onClick={() => handleDialogChange(false)}>Cancelar</Button>
            <Button className="bg-primary px-8" disabled={isSaving} onClick={handleSaveGroup}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Configurações
            </Button>
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
