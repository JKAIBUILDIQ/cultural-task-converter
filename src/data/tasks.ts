import { Task } from '../types';

export const sampleTasks: Task[] = [
  {
    id: '1',
    category: 'File Operations',
    english: 'Create a new file called "example.txt"',
    spanish: 'Crea un nuevo archivo llamado "ejemplo.txt"',
    french: 'Créer un nouveau fichier appelé "exemple.txt"',
    german: 'Erstelle eine neue Datei namens "beispiel.txt"',
    chinese: '创建一个名为"example.txt"的新文件',
    japanese: '"example.txt"という新しいファイルを作成して',
    portuguese: 'Crie um novo arquivo chamado "exemplo.txt"',
    description: 'Create a new text file with specified name',
    complexity: 'basic',
    tags: ['file', 'create', 'basic']
  },
  {
    id: '2',
    category: 'File Operations',
    english: 'Read the contents of "data.json"',
    spanish: 'Lee el contenido de "datos.json"',
    french: 'Lire le contenu de "donnees.json"',
    german: 'Lies den Inhalt von "daten.json"',
    chinese: '读取"data.json"的内容',
    japanese: '"data.json"の内容を読んで',
    portuguese: 'Leia o conteúdo de "dados.json"',
    description: 'Read and display file contents',
    complexity: 'basic',
    tags: ['file', 'read', 'json']
  },
  {
    id: '3',
    category: 'Programming & Development',
    english: 'Initialize a new Git repository',
    spanish: 'Inicializa un nuevo repositorio Git',
    french: 'Initialiser un nouveau dépôt Git',
    german: 'Initialisiere ein neues Git-Repository',
    chinese: '初始化新的Git仓库',
    japanese: '新しいGitリポジトリを初期化して',
    portuguese: 'Inicialize um novo repositório Git',
    description: 'Set up version control for a project',
    complexity: 'intermediate',
    tags: ['git', 'version-control', 'development']
  },
  {
    id: '4',
    category: 'Programming & Development',
    english: 'Create a Python script that prints "Hello World"',
    spanish: 'Crea un script de Python que imprima "Hola Mundo"',
    french: 'Créer un script Python qui affiche "Bonjour le Monde"',
    german: 'Erstelle ein Python-Skript, das "Hallo Welt" ausgibt',
    chinese: '创建一个打印"Hello World"的Python脚本',
    japanese: '"Hello World"を出力するPythonスクリプトを作成して',
    portuguese: 'Crie um script Python que imprima "Olá Mundo"',
    description: 'Basic Python programming task',
    complexity: 'basic',
    tags: ['python', 'script', 'hello-world']
  },
  {
    id: '5',
    category: 'Web Development',
    english: 'Create a responsive navigation menu',
    spanish: 'Crea un menú de navegación responsivo',
    french: 'Créer un menu de navigation responsive',
    german: 'Erstelle ein responsives Navigationsmenü',
    chinese: '创建响应式导航菜单',
    japanese: 'レスポンシブナビゲーションメニューを作成して',
    portuguese: 'Crie um menu de navegação responsivo',
    description: 'Build a mobile-friendly navigation component',
    complexity: 'intermediate',
    tags: ['web', 'responsive', 'navigation', 'css']
  },
  {
    id: '6',
    category: 'Data Analysis',
    english: 'Analyze sales data and create visualizations',
    spanish: 'Analiza datos de ventas y crea visualizaciones',
    french: 'Analyser les données de vente et créer des visualisations',
    german: 'Verkaufsdaten analysieren und Visualisierungen erstellen',
    chinese: '分析销售数据并创建可视化图表',
    japanese: '売上データを分析して可視化を作成して',
    portuguese: 'Analise dados de vendas e crie visualizações',
    description: 'Process and visualize business data',
    complexity: 'advanced',
    tags: ['data', 'analysis', 'visualization', 'business']
  },
  {
    id: '7',
    category: 'System Administration',
    english: 'Setup automated backup system',
    spanish: 'Configura un sistema de respaldo automatizado',
    french: 'Configurer un système de sauvegarde automatisé',
    german: 'Automatisiertes Backup-System einrichten',
    chinese: '设置自动备份系统',
    japanese: '自動バックアップシステムを設定して',
    portuguese: 'Configure um sistema de backup automatizado',
    description: 'Implement automated data backup solution',
    complexity: 'advanced',
    tags: ['system', 'backup', 'automation', 'administration']
  },
  {
    id: '8',
    category: 'Creative Tasks',
    english: 'Design a modern logo for a tech startup',
    spanish: 'Diseña un logo moderno para una startup tecnológica',
    french: 'Concevoir un logo moderne pour une startup tech',
    german: 'Entwerfe ein modernes Logo für ein Tech-Startup',
    chinese: '为科技初创公司设计现代徽标',
    japanese: 'テックスタートアップのモダンなロゴをデザインして',
    portuguese: 'Projete um logo moderno para uma startup de tecnologia',
    description: 'Create visual identity for technology company',
    complexity: 'intermediate',
    tags: ['design', 'logo', 'branding', 'creative']
  }
];

export const taskCategories = [
  'File Operations',
  'Programming & Development',
  'Web Development',
  'Data Analysis',
  'System Administration',
  'Text Processing',
  'Creative Tasks',
  'Learning & Education'
];

export const complexityLevels = ['basic', 'intermediate', 'advanced'] as const;
