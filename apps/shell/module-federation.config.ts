import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['user_identification', 'clients', 'selected_clients'],
};

export default config;
