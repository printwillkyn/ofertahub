
"use client"

import * as React from "react"
import { Clock, CheckCircle2, AlertCircle, Search, Calendar as CalendarIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const historyData = [
  {
    id: "1",
    offer: "Smart TV Samsung 55' UHD",
    group: "Ofertas Tech Brasil",
    sentAt: "Hoje, 14:20",
    status: "success",
    clicks: 124
  },
  {
    id: "2",
    offer: "Airfryer Philco Gourmet",
    group: "Casa & Cozinha VIP",
    sentAt: "Hoje, 09:15",
    status: "success",
    clicks: 89
  },
  {
    id: "3",
    offer: "Console PlayStation 5",
    group: "Gamers de Plantão",
    sentAt: "Ontem, 21:00",
    status: "error",
    clicks: 0,
    errorMsg: "API Offline"
  },
  {
    id: "4",
    offer: "Kindle Paperwhite 16GB",
    group: "Promoções Kindle",
    sentAt: "Ontem, 18:30",
    status: "success",
    clicks: 215
  }
]

export default function SentHistoryPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold text-foreground">Ofertas Enviadas</h1>
        <p className="text-muted-foreground">Histórico completo de mensagens e engajamento por grupo.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar no histórico..." className="pl-9 bg-card border-none shadow-sm" />
        </div>
        <Button variant="outline" className="bg-card shadow-sm border-none">
          <CalendarIcon className="mr-2 h-4 w-4" /> Últimos 30 dias
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <ScrollArea className="h-[600px]">
          <div className="p-0">
            {historyData.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  "flex items-center justify-between p-6 hover:bg-muted/30 transition-colors border-b last:border-0",
                  index % 2 === 0 ? "bg-card" : "bg-card/50"
                )}
              >
                <div className="flex gap-4 items-start">
                  <div className={cn(
                    "mt-1 p-2 rounded-full",
                    item.status === "success" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  )}>
                    {item.status === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{item.offer}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center"><Clock className="mr-1 h-3 w-3" /> {item.sentAt}</span>
                      <span className="flex items-center"><Users className="mr-1 h-3 w-3" /> {item.group}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Cliques</p>
                    <p className="text-xl font-headline font-bold text-primary">{item.clicks}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className={item.status === "success" ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-rose-600 border-rose-200 bg-rose-50"}>
                      {item.status === "success" ? "Sucesso" : "Falhou"}
                    </Badge>
                    {item.errorMsg && <span className="text-[10px] text-rose-400 font-medium">{item.errorMsg}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
