{
  description = "A prisma test project";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/master";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      node16Pkgs = import nixpkgs {
        inherit system;
        # config = { allowUnfree = true; };
        overlays = [(final: prev: { nodejs = prev.nodejs-16_x; })];
      };
    in {
      devShell = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = [
          node16Pkgs.nodejs
          node16Pkgs.yarn
          node16Pkgs.nodePackages.pnpm
          pkgs.nodePackages.mermaid-cli
          # pkgs.sqlite
        ];
      };
    });
}