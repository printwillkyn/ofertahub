
"use client"

import * as React from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  Send, 
  Sparkles,
  Loader2,
  Star,
  TrendingDown,
  ShoppingCart,
  ExternalLink,
  ChevronRight,
  Copy,
  Check
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { generateMarketingMessage } from "@/ai/flows/generate-marketing-message"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const initialOffers = [
  {
    id: "1",
    title: "Airfryer Philips Walita Essential",
    price: "R$ 449,90",
    avgPrice: "R$ 599,00",
    economy: "25%",
    niche: "Cozinha",
    rating: 4.9,
    sales: "1.2k+",
    score: 98,
    store: "Amazon",
    status: "Ativo",
    image: "kitchen-item"
  },
  {
    id: "2",
    title: "Mop Giratório Flash Limp",
    price: "R$ 69,90",
    avgPrice: "R$ 99,00",
    economy: "30%",
    niche: "Limpeza",
    rating: 4.7,
    sales: "5k+",
    score: 95,
    store: "Mercado Livre",
    status: "Ativo",
    image: "cleaning-item"
  },
  {
    id: "3",
    title: "Fralda Pampers Premium Care G 80 un",
    price: "R$ 89,90",
    avgPrice: "R$ 119,00",
    economy: "24%",
    niche: "Bebê",
    rating: 4.8,
    sales: "10k+",
    score: 92,
    store: "Magalu",
    status: "Ativo",
    image: "baby-item"
  },
  {
    id: "4",
    title: "Jogo de Panelas Tramontina 5 Peças",
    price: "R$ 259,00",
    avgPrice: "R$ 349,00",
    economy: "26%",
    niche: "Cozinha",
    rating: 4.8,
    sales: "2.5k+",
    score: 89,
    store: "Amazon",
    status: "Ativo",
    image: "kitchen-item"
  },
  {
    id: "5",
    title: "Organizador de Acrílico Empilhável",
    price: "R$ 34,90",
    avgPrice: "R$ 49,90",
    economy: "30%",
    niche: "Organização",
    rating: 4.5,
    sales: "800+",
    score: 84,
    store: "Shopee",
    status: "Ativo",
    image: "house-item"
  }
]

export default function DailyOffersPage() {
  const [offers, setOffers] = React.useState(initialOffers)
  const [isAiLoading, setIsAiLoading] = React.useState(false)
  const [generatedCopy, setGeneratedCopy] = React.useState("")
  const [offerToAnalyse, setOfferToAnalyse] = React.useState<any>(null)
  const [selectedNiche, setSelectedNiche] = React.useState("Geral")
  const { toast } = useToast()

  const handleGenerateCopy = async (offer: any) => {
    setIsAiLoading(true)
    try {
      const result = await generateMarketingMessage({
        offerDescription: `${offer.title} por ${offer.price}. Economia de ${offer.economy}. Loja: ${offer.store}`,
        audienceNiche: selectedNiche
      })
      setGeneratedCopy(result.marketingMessage)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar copy",
        description: "Não foi possível gerar a mensagem de marketing no momento."
      })
    } finally {
      setIsAiLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 border-emerald-200 bg-emerald-50"
    if (score >= 80) return "text-amber-600 border-amber-200 bg-amber-50"
    return "text-blue-600 border-blue-200 bg-blue-50"
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-foreground">Central de Análise de Ofertas</h1>
          <p className="text-muted-foreground">Monitore e dispare as melhores oportunidades de conversão.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Nova Oferta Manual
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl shadow-sm border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por produto ou nicho..." 
            className="pl-9 bg-background border-none ring-1 ring-border/50 focus-visible:ring-primary/50" 
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none">
            Relatórios
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="font-headline py-4">Oferta</TableHead>
              <TableHead className="font-headline text-center">Score</TableHead>
              <TableHead className="font-headline">Preço Atual</TableHead>
              <TableHead className="font-headline">Economia %</TableHead>
              <TableHead className="font-headline">Avaliação</TableHead>
              <TableHead className="font-headline">Vendas</TableHead>
              <TableHead className="w-[120px] text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id} className="group hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => {
                setOfferToAnalyse(offer);
                setGeneratedCopy("");
              }}>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{offer.title}</div>
                        <Badge variant="secondary" className="bg-muted text-muted-foreground border-none text-[10px] uppercase font-bold">
                          {offer.niche}
                        </Badge>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] overflow-hidden">
                      {offerToAnalyse && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="font-headline text-2xl flex items-center gap-2">
                              <Sparkles className="h-6 w-6 text-amber-500" />
                              Análise Detalhada: {offerToAnalyse.title}
                            </DialogTitle>
                            <DialogDescription>
                              Dados consolidados de performance e histórico de preços.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid md:grid-cols-2 gap-8 py-4">
                            {/* Lado Esquerdo: Produto e Métricas */}
                            <div className="space-y-6">
                              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                                <Image 
                                  src={PlaceHolderImages.find(img => img.id === offerToAnalyse.image)?.imageUrl || "https://picsum.photos/400/400"} 
                                  alt={offerToAnalyse.title}
                                  fill
                                  className="object-cover"
                                  data-ai-hint={PlaceHolderImages.find(img => img.id === offerToAnalyse.image)?.imageHint || "product"}
                                />
                                <Badge className="absolute top-4 right-4 bg-primary text-white text-lg font-bold py-1 px-3">
                                  Score {offerToAnalyse.score}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-muted/30 rounded-lg">
                                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Preço Médio</p>
                                  <p className="text-sm font-semibold text-muted-foreground line-through">{offerToAnalyse.avgPrice}</p>
                                </div>
                                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                                  <p className="text-[10px] uppercase font-bold text-primary">Preço Hoje</p>
                                  <p className="text-xl font-bold text-primary">{offerToAnalyse.price}</p>
                                </div>
                                <div className="p-3 bg-emerald-50 rounded-lg">
                                  <p className="text-[10px] uppercase font-bold text-emerald-600">Economia</p>
                                  <p className="text-lg font-bold text-emerald-600">{offerToAnalyse.economy}</p>
                                </div>
                                <div className="p-3 bg-indigo-50 rounded-lg">
                                  <p className="text-[10px] uppercase font-bold text-indigo-600">Vendas (Mês)</p>
                                  <p className="text-lg font-bold text-indigo-600">{offerToAnalyse.sales}</p>
                                </div>
                              </div>
                            </div>

                            {/* Lado Direito: IA e WhatsApp */}
                            <div className="flex flex-col gap-4">
                              <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                  <Sparkles className="h-4 w-4 text-amber-500" /> Refinar por Público
                                </Label>
                                <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                                  <SelectTrigger className="bg-muted/30">
                                    <SelectValue placeholder="Selecione o nicho" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Geral">Público Geral</SelectItem>
                                    <SelectItem value="Mães e Pais">Mães e Pais</SelectItem>
                                    <SelectItem value="Aposentados">Aposentados</SelectItem>
                                    <SelectItem value="Pobres e Economistas">Focados em Economia</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full mt-2 border-primary/30 text-primary hover:bg-primary/5"
                                  onClick={() => handleGenerateCopy(offerToAnalyse)}
                                  disabled={isAiLoading}
                                >
                                  {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                  {generatedCopy ? "Regerar Mensagem com IA" : "Gerar Mensagem de WhatsApp"}
                                </Button>
                              </div>

                              <div className="flex-1 space-y-2">
                                <Label>Texto para Disparo (WhatsApp)</Label>
                                <div className="relative h-[240px]">
                                  <Textarea 
                                    className="h-full resize-none bg-muted/20 border-muted p-4 leading-relaxed font-body text-sm"
                                    value={generatedCopy || `🚨 OFERTA DETECTADA! 🚨\n\n${offerToAnalyse.title}\n\n🔥 De: ${offerToAnalyse.avgPrice}\n✅ Por: ${offerToAnalyse.price}\n\n🛒 Link: ${offerToAnalyse.store}.com/link-afiliado`}
                                    onChange={(e) => setGeneratedCopy(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="gap-2 sm:gap-0 border-t pt-4">
                            <Button variant="ghost" className="text-muted-foreground" onClick={() => window.open('#', '_blank')}>
                              <ExternalLink className="mr-2 h-4 w-4" /> Ver na {offerToAnalyse.store}
                            </Button>
                            <div className="flex gap-2">
                              <Button variant="secondary" onClick={() => {
                                navigator.clipboard.writeText(generatedCopy)
                                toast({ title: "Copiado!", description: "Mensagem pronta para colar no WhatsApp." })
                              }}>
                                <Copy className="mr-2 h-4 w-4" /> Copiar Texto
                              </Button>
                              <Button className="bg-primary hover:bg-primary/90">
                                <Send className="mr-2 h-4 w-4" /> Enviar para Grupos
                              </Button>
                            </div>
                          </DialogFooter>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-center">
                  <div className={cn(
                    "inline-flex items-center justify-center h-10 w-10 rounded-full font-bold text-xs border-2",
                    getScoreColor(offer.score)
                  )}>
                    {offer.score}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-bold text-foreground">{offer.price}</div>
                  <div className="text-[10px] text-muted-foreground line-through">{offer.avgPrice}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-emerald-600 font-bold">
                    <TrendingDown className="mr-1 h-3 w-3" /> {offer.economy}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="h-3 w-3 fill-current" /> {offer.rating}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <ShoppingCart className="h-3 w-3" /> {offer.sales}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-primary hover:bg-primary/10 rounded-full" onClick={(e) => {
                    e.stopPropagation();
                    toast({ title: "Enviando...", description: "Preparando disparo para os grupos selecionados." });
                  }}>
                    <Send className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
