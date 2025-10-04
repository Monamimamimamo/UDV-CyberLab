export const mobileNav = [
  // TODO
  // {
  //   label: 'Новости',
  //   links: [{ label: 'Новости', path: '/events' }],
  // },
  // {
  //   label: 'Учебные материалы',
  //   links: [{ label: 'Учебные материалы', path: '/education-materials' }],
  // },
  // {
  //   label: 'Лабораторные работы',
  //   links: [{ label: 'Лабораторные работы', path: '/labs' }],
  // },
  {
    label: 'Витрина проектов',
    links: [
      { label: 'Все проектов', path: '/projects' },
      { label: 'Мои проекты', path: '/projects/my' },
    ],
  },
  {
    label: 'Тестирование',
    path: '/tests',
    links: [
      { label: 'Мои тесты', path: '/tests/my' },
      { label: 'База тестов', path: '/tests' },
    ],
  },
  {
    adminOnly: true,
    label: 'Администрирование',
    path: '/admin',
    links: [
      { label: 'Пользователи', path: '/admin/users' },
      { label: 'Витрина проектов', path: '/admin/projects' },
      { label: 'Тесты', path: '/admin/tests' },
      { label: 'Новости', path: '/admin/news' },
      { label: 'Учебные материалы', path: '/admin/education-materials' },
    ],
  },
];
