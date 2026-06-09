
"use client"

import * as React from "react"
import { 
  Palette, 
  Smartphone, 
  MessageSquare, 
  Globe, 
  Save, 
  ShieldCheck, 
  ExternalLink,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas alterações foram aplicadas com sucesso."
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Personalize sua marca e conexões de API.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary rounded-lg shadow-lg shadow-primary/20">
          <Save className="mr-2 h-4 w-4" /> Salvar Tudo
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-card w-full justify-start p-1 h-auto mb-6 gap-2">
          <TabsTrigger value="general" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Globe className="h-4 w-4 mr-2" /> Geral
          </TabsTrigger>
          <TabsTrigger value="evolution" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Smartphone className="h-4 w-4 mr-2" /> Evolution API
          </TabsTrigger>
          <TabsTrigger value="brand" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Palette className="h-4 w-4 mr-2" /> Branding
          </TabsTrigger>
          <TabsTrigger value="messages" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <MessageSquare className="h-4 w-4 mr-2" /> Mensagens
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Informações do SaaS</CardTitle>
              <CardDescription>Dados básicos da sua conta OfertaHub.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="hub-name">Nome da Instância</Label>
                <Input id="hub-name" defaultValue="Minhas Ofertas VIP" className="bg-muted/30" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hub-email">E-mail de Notificação</Label>
                <Input id="hub-email" defaultValue="admin@ofertahub.com" className="bg-muted/30" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label className="text-base">Modo Automático</Label>
                  <p className="text-sm text-muted-foreground">Enviar ofertas assim que forem detectadas pela IA.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolution" className="space-y-4">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-headline">Conexão Evolution API</CardTitle>
                  <CardDescription>Configure sua instância do WhatsApp via Evolution.</CardDescription>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-none">Conectado</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>URL da Instância</Label>
                <Input placeholder="https://api.suadominio.com" defaultValue="https://evolution.ofertahub.app" className="bg-muted/30" />
              </div>
              <div className="grid gap-2">
                <Label>API Key (Global/Instância)</Label>
                <Input type="password" value="*************************" className="bg-muted/30" />
              </div>
              <div className="grid gap-2">
                <Label>Nome da Instância</Label>
                <Input placeholder="whatsapp_ofertahub" className="bg-muted/30" />
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <ShieldCheck className="h-4 w-4 mr-2 text-emerald-500" /> Testar Conexão
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brand" className="space-y-4">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Identidade Visual</CardTitle>
              <CardDescription>Como sua marca aparece para os usuários.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-8">
                <div className="space-y-2 flex-1">
                  <Label>Logo da Marca</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center shadow-inner">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <Button variant="secondary" size="sm">Alterar Logo</Button>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <Label>Cor Primária</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-24 rounded-md bg-[#4461E1] shadow-sm border" />
                    <Input defaultValue="#4461E1" className="w-24 h-10 uppercase text-xs" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <Label>Favicon</Label>
                <Button variant="outline" size="sm">Fazer Upload</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Textos Padrão</CardTitle>
              <CardDescription>Estrutura base para todas as suas ofertas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Mensagem de Saudação</Label>
                <Input defaultValue="🚨 OFERTA IMPERDÍVEL DETECTADA! 🚨" className="bg-muted/30" />
              </div>
              <div className="grid gap-2">
                <Label>Rodapé de Link (CTA)</Label>
                <Input defaultValue="🛒 Clique no link abaixo para aproveitar:" className="bg-muted/30" />
              </div>
              <div className="grid gap-2">
                <Label>Aviso Legal / Regras</Label>
                <Textarea 
                  defaultValue="*O preço pode sofrer alteração a qualquer momento pela loja. Verifique sempre o valor final no carrinho.*" 
                  className="bg-muted/30 resize-none h-24"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
