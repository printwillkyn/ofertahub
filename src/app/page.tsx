
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  TrendingUp, 
  Users, 
  MousePointer2, 
  Send,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Seg", clicks: 400, sent: 2400 },
  { name: "Ter", clicks: 300, sent: 1398 },
  { name: "Qua", clicks: 200, sent: 9800 },
  { name: "Qui", clicks: 278, sent: 3908 },
  { name: "Sex", clicks: 189, sent: 4800 },
  { name: "Sáb", clicks: 239, sent: 3800 },
  { name: "Dom", clicks: 349, sent: 4300 },
]

const stats = [
  {
    title: "Cliques Totais",
    value: "12,845",
    change: "+12.5%",
    trend: "up",
    icon: MousePointer2,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Ofertas Enviadas",
    value: "1,250",
    change: "+5.2%",
    trend: "up",
    icon: Send,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    title: "Grupos Ativos",
    value: "48",
    change: "0%",
    trend: "neutral",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: "Engajamento",
    value: "24.2%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    color: "text-amber-600",
    bg: "bg-amber-50"
  }
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Acompanhe o desempenho das suas ofertas em tempo real.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                {stat.trend === "up" && (
                  <span className="flex items-center text-xs font-medium text-emerald-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> {stat.change}
                  </span>
                )}
                {stat.trend === "down" && (
                  <span className="flex items-center text-xs font-medium text-rose-600">
                    <ArrowDownRight className="h-3 w-3 mr-1" /> {stat.change}
                  </span>
                )}
                {stat.trend === "neutral" && (
                  <span className="text-xs font-medium text-muted-foreground">{stat.change}</span>
                )}
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Cliques por Dia</CardTitle>
            <CardDescription>Visualização semanal de engajamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={{ clicks: { label: "Cliques", color: "hsl(var(--primary))" } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="clicks" 
                      fill="var(--color-clicks)" 
                      radius={[4, 4, 0, 0]} 
                      className="transition-all hover:opacity-80"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Distribuição por Nicho</CardTitle>
            <CardDescription>Volume de envios por categoria</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center h-[300px]">
             <div className="space-y-4">
               {[
                 { label: "Eletrônicos", percentage: 45, color: "bg-blue-500" },
                 { label: "Moda", percentage: 25, color: "bg-indigo-500" },
                 { label: "Casa", percentage: 15, color: "bg-emerald-500" },
                 { label: "Beleza", percentage: 10, color: "bg-amber-500" },
                 { label: "Outros", percentage: 5, color: "bg-slate-500" }
               ].map((niche) => (
                 <div key={niche.label} className="space-y-1">
                   <div className="flex justify-between text-sm">
                     <span className="font-medium">{niche.label}</span>
                     <span className="text-muted-foreground">{niche.percentage}%</span>
                   </div>
                   <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                     <div 
                      className={cn("h-full rounded-full", niche.color)} 
                      style={{ width: `${niche.percentage}%` }}
                    />
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
