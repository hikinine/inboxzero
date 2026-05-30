export default {
  tasky: {
    output: {
      client: 'react-query',
      target: './react-query',
      workspace: '.',
      clean: true,
      mode: 'tags-split',
      indexFiles: true,
      override: {
        header: false,
        mutator: {
          path: './http/axios-instance.ts',
          name: 'axiosInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
      mock: false,
    },
    input: {
      target: '../../apps/api/openapi.json',
    },
  },
};
