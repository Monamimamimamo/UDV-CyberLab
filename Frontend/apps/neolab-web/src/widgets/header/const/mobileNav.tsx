export const mobileNav = [
  // {
  //   label: 'Лабораторные работы',
  //   links: [{ label: 'Лабораторные работы', path: '/labs' }],
  // },

  {
    label: 'Учебные материалы',
    links: [{ label: 'Учебные материалы', path: '/learn-materials' }],
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
    label: 'Витрина проектов',
    links: [
      { label: 'Все проектов', path: '/projects' },
      { label: 'Мои проекты', path: '/projects/my' },
    ],
  },
  {
    label: 'Новости',
    links: [{ label: 'Все новости', path: '/news' }],
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
