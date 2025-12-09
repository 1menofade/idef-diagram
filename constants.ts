import { DiagramData, IdefEdge, IdefNode } from './types';

// Context Diagram (A-0)
const CONTEXT_NODES: IdefNode[] = [
  { id: 'A0', label: 'Управлять деятельностью веб-студии (DevStudioOS)', x: 450, y: 350, width: 300, height: 180, number: '0' }
];

const CONTEXT_EDGES: IdefEdge[] = [
  // Inputs (Left)
  { id: 'c-in-1', sourceId: 'EXTERNAL', targetId: 'A0', label: 'Потенциальные клиенты (Лиды)', side: 'LEFT', offset: -40 },
  { id: 'c-in-2', sourceId: 'EXTERNAL', targetId: 'A0', label: 'Git Commits (код разработчиков)', side: 'LEFT', offset: 0 },
  { id: 'c-in-3', sourceId: 'EXTERNAL', targetId: 'A0', label: 'Данные сотрудников', side: 'LEFT', offset: 40 },

  // Controls (Top)
  { id: 'c-ctrl-1', sourceId: 'EXTERNAL', targetId: 'A0', label: 'Законодательство РФ (ТК, НК)', side: 'TOP', offset: -60 },
  { id: 'c-ctrl-2', sourceId: 'EXTERNAL', targetId: 'A0', label: 'Устав студии и регламенты', side: 'TOP', offset: -20 },
  { id: 'c-ctrl-3', sourceId: 'EXTERNAL', targetId: 'A0', label: 'Бюджеты проектов', side: 'TOP', offset: 20 },
  { id: 'c-ctrl-4', sourceId: 'EXTERNAL', targetId: 'A0', label: 'Agile методология', side: 'TOP', offset: 60 },

  // Mechanisms (Bottom)
  { id: 'c-mech-1', sourceId: 'EXTERNAL', targetId: 'A0', label: 'Персонал (PM, Dev, Sales, Admin)', side: 'BOTTOM', offset: -50 },
  { id: 'c-mech-2', sourceId: 'EXTERNAL', targetId: 'A0', label: 'Инфраструктура (PostgreSQL, Redis)', side: 'BOTTOM', offset: 0 },
  { id: 'c-mech-3', sourceId: 'EXTERNAL', targetId: 'A0', label: 'DevStudioOS (скрипты, Celery)', side: 'BOTTOM', offset: 50 },

  // Outputs (Right)
  { id: 'c-out-1', sourceId: 'A0', targetId: 'EXTERNAL', label: 'Готовое ПО (Релизы)', side: 'RIGHT', offset: -30 },
  { id: 'c-out-2', sourceId: 'A0', targetId: 'EXTERNAL', label: 'Фин. документация (Акты, Счета)', side: 'RIGHT', offset: 10 },
  { id: 'c-out-3', sourceId: 'A0', targetId: 'EXTERNAL', label: 'Отчетность (Маржа, Эффективность)', side: 'RIGHT', offset: 50 },
];

export const CONTEXT_DIAGRAM: DiagramData = {
  title: 'Контекстная диаграмма (A-0)',
  code: 'A-0',
  nodes: CONTEXT_NODES,
  edges: CONTEXT_EDGES,
};

// Decomposition Diagram (A0)
// Diagonal Layout to support flow
const DECOMP_NODES: IdefNode[] = [
  { id: 'A1', label: 'Управлять продажами (CRM)', x: 100, y: 100, width: 220, height: 120, number: '1' },
  { id: 'A2', label: 'Управлять ресурсами (Core Team)', x: 350, y: 300, width: 220, height: 120, number: '2' },
  { id: 'A3', label: 'Вести производственный процесс (PM)', x: 600, y: 500, width: 240, height: 140, number: '3' },
  { id: 'A4', label: 'Управлять финансами (Finance)', x: 850, y: 700, width: 220, height: 120, number: '4' },
];

const DECOMP_EDGES: IdefEdge[] = [
  // --- A1 Sales (CRM) ---
  // Inputs
  { id: 'd-a1-in1', sourceId: 'EXTERNAL', targetId: 'A1', label: 'Лиды', side: 'LEFT', offset: -20 },
  { id: 'd-a1-in2', sourceId: 'EXTERNAL', targetId: 'A1', label: 'Заявки с сайта', side: 'LEFT', offset: 20 },
  // Controls
  { id: 'd-a1-ctrl1', sourceId: 'EXTERNAL', targetId: 'A1', label: 'План продаж', side: 'TOP', offset: -30 },
  { id: 'd-a1-ctrl2', sourceId: 'EXTERNAL', targetId: 'A1', label: 'Ценовая политика', side: 'TOP', offset: 20 },
  // Mechanisms
  { id: 'd-a1-mech1', sourceId: 'EXTERNAL', targetId: 'A1', label: 'Sales Manager', side: 'BOTTOM', offset: 0 },
  
  // --- A2 HR (Core Team) ---
  // Inputs
  { id: 'd-a2-in1', sourceId: 'EXTERNAL', targetId: 'A2', label: 'Данные кандидатов', side: 'LEFT', offset: -20 },
  { id: 'd-a2-in2', sourceId: 'EXTERNAL', targetId: 'A2', label: 'График отпусков', side: 'LEFT', offset: 20 },
  // Controls
  { id: 'd-a2-ctrl1', sourceId: 'EXTERNAL', targetId: 'A2', label: 'ТК РФ', side: 'TOP', offset: -30 },
  { id: 'd-a2-ctrl2', sourceId: 'EXTERNAL', targetId: 'A2', label: 'Штатное расписание', side: 'TOP', offset: 20 },
  // Mechanisms
  { id: 'd-a2-mech1', sourceId: 'EXTERNAL', targetId: 'A2', label: 'HR / Admin', side: 'BOTTOM', offset: 0 },

  // --- A3 Production (PM) ---
  // Inputs
  { id: 'd-a1-to-a3-1', sourceId: 'A1', targetId: 'A3', label: 'Новый клиент', side: 'LEFT', sourceSide: 'RIGHT', offset: -40 },
  { id: 'd-a1-to-a3-2', sourceId: 'A1', targetId: 'A3', label: 'Подписанный контракт', side: 'LEFT', sourceSide: 'RIGHT', offset: -20 },
  { id: 'd-a2-to-a3', sourceId: 'A2', targetId: 'A3', label: 'Availability (Доступность)', side: 'LEFT', sourceSide: 'RIGHT', offset: 0 }, 
  { id: 'd-a3-in-ext', sourceId: 'EXTERNAL', targetId: 'A3', label: 'Git Commits (Webhook)', side: 'LEFT', offset: 40 },
  
  // Controls
  { id: 'd-a3-ctrl1', sourceId: 'EXTERNAL', targetId: 'A3', label: 'Техническое задание (Wiki)', side: 'TOP', offset: -40 },
  { id: 'd-a3-ctrl2', sourceId: 'EXTERNAL', targetId: 'A3', label: 'Agile методология', side: 'TOP', offset: 0 },
  // Feedback Control from A4 (Debt Control)
  { id: 'd-a4-to-a3-ctrl', sourceId: 'A4', targetId: 'A3', label: 'Блокировка спринта', side: 'TOP', sourceSide: 'TOP' },

  // Mechanisms
  { id: 'd-a3-mech1', sourceId: 'EXTERNAL', targetId: 'A3', label: 'PM, Dev, QA', side: 'BOTTOM', offset: -30 },
  { id: 'd-a3-mech2', sourceId: 'EXTERNAL', targetId: 'A3', label: 'Git Parser Service', side: 'BOTTOM', offset: 30 },

  // --- A4 Finance ---
  // Inputs from A2 (Cost) and A3 (TimeLogs)
  { id: 'd-a2-to-a4', sourceId: 'A2', targetId: 'A4', label: 'Cost Rate (Себестоимость)', side: 'LEFT', sourceSide: 'RIGHT', offset: -20 },
  { id: 'd-a3-to-a4', sourceId: 'A3', targetId: 'A4', label: 'TimeLogs', side: 'LEFT', sourceSide: 'RIGHT', offset: 20 },
  
  // Controls
  { id: 'd-a4-ctrl1', sourceId: 'EXTERNAL', targetId: 'A4', label: 'Налоговый кодекс', side: 'TOP', offset: -30 },
  { id: 'd-a4-ctrl2', sourceId: 'EXTERNAL', targetId: 'A4', label: 'Условия договоров', side: 'TOP', offset: 20 },
  
  // Mechanisms
  { id: 'd-a4-mech1', sourceId: 'EXTERNAL', targetId: 'A4', label: 'Бухгалтер', side: 'BOTTOM', offset: -30 },
  { id: 'd-a4-mech2', sourceId: 'EXTERNAL', targetId: 'A4', label: 'Billing Service (Cron)', side: 'BOTTOM', offset: 30 },

  // --- Global Outputs ---
  { id: 'd-a3-out1', sourceId: 'A3', targetId: 'EXTERNAL', label: 'Готовое ПО (Релизы)', side: 'RIGHT', offset: -30 },
  { id: 'd-a3-out2', sourceId: 'A3', targetId: 'EXTERNAL', label: 'Статус задач (Review/Done)', side: 'RIGHT', offset: 10 },
  
  { id: 'd-a4-out1', sourceId: 'A4', targetId: 'EXTERNAL', label: 'Счета и Акты (PDF)', side: 'RIGHT', offset: -20 },
  { id: 'd-a4-out2', sourceId: 'A4', targetId: 'EXTERNAL', label: 'Отчет по маржинальности', side: 'RIGHT', offset: 20 },
];

export const DECOMPOSITION_DIAGRAM: DiagramData = {
  title: 'Декомпозиция (A0)',
  code: 'A0',
  nodes: DECOMP_NODES,
  edges: DECOMP_EDGES,
};