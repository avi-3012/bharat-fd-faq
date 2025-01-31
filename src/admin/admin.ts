// import AdminBro from 'admin-bro';
// import AdminBroExpress from '@admin-bro/express';
// import AdminBroMongoose from '@admin-bro/mongoose';
// import FAQ from '../models/faq.model';

// AdminBro.registerAdapter(AdminBroMongoose);

// export const setupAdmin = () => {
//   const adminBro = new AdminBro({
//     resources: [{
//       resource: FAQ,
//       options: {
//         properties: {
//           question: {
//             components: {
//               edit: AdminBro.bundle('./components/TranslationEditor'),
//               show: AdminBro.bundle('./components/TranslationViewer')
//             }
//           },
//           answer: {
//             type: 'richtext',
//             components: {
//               edit: AdminBro.bundle('./components/RichTextEditor'),
//               show: AdminBro.bundle('./components/RichTextViewer')
//             }
//           }
//         }
//       }
//     }],
//     rootPath: '/admin'
//   });

//   return AdminBroExpress.buildRouter(adminBro);
// };