
"use client"

import * as React from "react"
import { 
  Palette, 
  Smartphone, 
  MessageSquare, 
  Globe, 
  Save, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  Tag,
  Sparkles,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [messageTemplate, setMessageTemplate] = React.useState(`🔥 ACHADINHO DO DIA\n\n📦 {produto}\n\n💰 De: R$ {preco_anterior}\n🔥 Por: R$ {preco_atual}\n\n⭐ Avaliação: {avaliacao}\n\n🛒 Comprar:\n{link}`)
  
  const [niches, setNiches] = React.useState([
    "Casa", "Cozinha", "Organização", "Limpeza", "Bebê", "Utilidades"
  ])

  // Avoid hydration mismatch by waiting for mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "As alterações administrativas foram aplicadas com sucesso."
    })
  }

  const handleDeleteNiche = (nicheToDelete: string) => {
    setNiches(niches.filter(n => n !== nicheToDelete))
    toast({ title: "Nicho removido", description: `${nicheToDelete} foi excluído da lista.` })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-foreground">Centro Administrativo</h1>
          <p className="text-muted-foreground">Controle global de marca, conexões, IA e regras de negócio.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary rounded-lg shadow-lg shadow-primary/20 px-8">
          <Save className="mr-2 h-4 w-4" /> Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-card w-full justify-start p-1 h-auto mb-6 gap-2 overflow-x-auto">
          <TabsTrigger value="general" className="rounded-md py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Globe className="h-4 w-4 mr-2" /> Geral
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="rounded-md py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Smartphone className="h-4 w-4 mr-2" /> WhatsApp
          </TabsTrigger>
          <TabsTrigger value="messages" className="rounded-md py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <MessageSquare className="h-4 w-4 mr-2" /> Mensagens
          </TabsTrigger>
          <TabsTrigger value="score" className="rounded-md py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <TrendingUp className="h-4 w-4 mr-2" /> Score
          </TabsTrigger>
          <TabsTrigger value="niches" className="rounded-md py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Tag className="h-4 w-4 mr-2" /> Nichos
          </TabsTrigger>
          <TabsTrigger value="ia" className="rounded-md py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Sparkles className="h-4 w-4 mr-2" /> IA
          </TabsTrigger>
        </TabsList>

        {/* 1. ABA GERAL */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Configurações Gerais</CardTitle>
              <CardDescription>Gerencie suas informações básicas e preferências visuais.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gmail-backup">E-mail (Gmail) para Backup e Relatórios</Label>
                  <Input id="gmail-backup" placeholder="seu-email@gmail.com" className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label>Tema da Interface</Label>
                  <div className="flex items-center justify-between p-4 border rounded-xl bg-muted/10">
                    <span className="text-sm font-medium">Modo Escuro (Dark Mode)</span>
                    <Switch 
                      checked={mounted && resolvedTheme === 'dark'} 
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                      disabled={!mounted}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. ABA WHATSAPP */}
        <TabsContent value="whatsapp" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg font-headline">Conexão Evolution API</CardTitle>
                <CardDescription>Gerencie a integração com o motor de WhatsApp.</CardDescription>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 flex items-center gap-1.5 px-3 py-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Conectado
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>URL da Evolution API</Label>
                  <Input placeholder="https://api.suadominio.com" defaultValue="https://evolution.ofertahub.app" className="bg-muted/30" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Token de Acesso</Label>
                    <Input type="password" value="*************************" className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome da Instância</Label>
                    <Input defaultValue="instancia_ofertahub_01" className="bg-muted/30" />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t flex gap-3">
                <Button className="flex-1 bg-primary">
                  <ShieldCheck className="h-4 w-4 mr-2" /> Salvar Conexão
                </Button>
                <Button variant="outline" className="flex-1">
                  Testar Conexão em Tempo Real
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. ABA MENSAGENS */}
        <TabsContent value="messages" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-headline">Editor de Mensagem Padrão</CardTitle>
                <CardDescription>Defina a estrutura base para todos os disparos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Corpo da Mensagem (WhatsApp)</Label>
                  <Textarea 
                    value={messageTemplate} 
                    onChange={(e) => setMessageTemplate(e.target.value)}
                    className="font-mono text-sm leading-relaxed h-[280px] bg-muted/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Variáveis Disponíveis</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {["produto", "preco_anterior", "preco_atual", "economia", "avaliacao", "vendas", "link", "nicho"].map(v => (
                      <Badge key={v} variant="secondary" className="font-mono text-[9px] cursor-pointer hover:bg-primary hover:text-white transition-colors">
                        {`{${v}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-primary/[0.02]">
              <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" /> Preview no Celular
                </CardTitle>
                <CardDescription>Como a oferta aparecerá para seu cliente.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mx-auto w-[280px] bg-[#E5DDD5] rounded-[32px] border-[8px] border-slate-800 p-2 shadow-2xl">
                  <div className="bg-[#DCF8C6] dark:bg-[#054740] p-3 rounded-lg shadow-sm text-[11px] font-body whitespace-pre-wrap leading-tight text-foreground">
                    {messageTemplate
                      .replace("{produto}", "Airfryer Philips Walita")
                      .replace("{preco_anterior}", "599,00")
                      .replace("{preco_atual}", "449,90")
                      .replace("{avaliacao}", "4.9")
                      .replace("{link}", "https://amzn.to/3afiliado")
                    }
                  </div>
                  <div className="mt-2 text-center text-[10px] text-muted-foreground uppercase tracking-widest">Preview WhatsApp</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 4. ABA SCORE */}
        <TabsContent value="score" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Regras de Curadoria Automática</CardTitle>
              <CardDescription>Defina os critérios mínimos para que uma oferta seja listada.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label>Score Mínimo (0-100)</Label>
                  <Input type="number" defaultValue={80} className="font-bold text-primary" />
                </div>
                <div className="space-y-2">
                  <Label>Avaliação Mínima (⭐)</Label>
                  <Input type="number" step="0.1" defaultValue={4.5} className="font-bold text-amber-500" />
                </div>
                <div className="space-y-2">
                  <Label>Vendas Mínimas (Mês)</Label>
                  <Input type="number" defaultValue={100} className="font-bold text-indigo-600" />
                </div>
                <div className="space-y-2">
                  <Label>Economia Mínima %</Label>
                  <Input type="number" defaultValue={15} className="font-bold text-emerald-600" />
                </div>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                  <strong>Atenção:</strong> Essas configurações afetam diretamente a quantidade de ofertas disponíveis. Valores muito altos podem reduzir drasticamente o volume de disparos.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5. ABA NICHOS */}
        <TabsContent value="niches" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-headline">Gestão de Nichos</CardTitle>
                <CardDescription>Defina as categorias de produtos que a plataforma monitora.</CardDescription>
              </div>
              <Button size="sm" className="bg-primary">
                <Plus className="h-4 w-4 mr-1" /> Criar Nicho
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {niches.map((niche) => (
                  <div key={niche} className="group p-4 border rounded-xl flex items-center justify-between hover:border-primary transition-colors bg-muted/5">
                    <span className="font-medium text-sm">{niche}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteNiche(niche)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6. ABA IA */}
        <TabsContent value="ia" className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-headline">Inteligência Artificial (Genkit)</CardTitle>
                  <CardDescription>Configure como a IA reescreve suas mensagens para conversão.</CardDescription>
                </div>
                <Switch defaultChecked />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Tom da Mensagem</Label>
                  <Select defaultValue="economia">
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue placeholder="Selecione o tom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conversa">Amigável / Conversa</SelectItem>
                      <SelectItem value="economia">Focado em Economia</SelectItem>
                      <SelectItem value="urgencia">Urgência / Escassez</SelectItem>
                      <SelectItem value="informativo">Técnico / Informativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Criatividade da IA (Temperature)</Label>
                  <Input type="number" step="0.1" defaultValue={0.7} className="bg-muted/30" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Contexto Adicional para a IA</Label>
                  <Textarea 
                    placeholder="Ex: Sempre use emojis relacionados a casa e família. Evite gírias muito informais." 
                    className="h-24 bg-muted/30 resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
