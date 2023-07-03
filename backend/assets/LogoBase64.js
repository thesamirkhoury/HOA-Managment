const logoBase64 =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjwhLS0gQ3JlYXRlZCB3aXRoIFZlY3Rvcm5hdG9yIChodHRwOi8vdmVjdG9ybmF0b3IuaW8vKSAtLT4KPHN2ZyBoZWlnaHQ9IjEwMCUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3R5bGU9ImZpbGwtcnVsZTpub256ZXJvO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMzNzAuODIgMjM4NC4yNCIgd2lkdGg9IjEwMCUiIHhtbFNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuc1ZlY3Rvcm5hdG9yPSJodHRwOi8vdmVjdG9ybmF0b3IuaW8iIHhtbG5zWGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgo8ZGVmcy8+CjxnIGlkPSJMYXllci0xIiB2ZWN0b3JuYXRvckxheWVyTmFtZT0iTGF5ZXIgMSI+CjxnIG9wYWNpdHk9IjEiPgo8cGF0aCBkPSJNMjYyMS41NiA3MjcuMTAyTDI2MjEuNTYgMTQyMy4xOEMyNjIxLjU2IDE0OTQuOSAyNjA5LjQzIDE1NjAuNTUgMjU4NS4xOCAxNjIwLjE0QzI1NjAuOTIgMTY3OS43MyAyNTI3LjE3IDE3MzEuNDEgMjQ4My45MyAxNzc1LjE4QzI0NDAuNjkgMTgxOC45NSAyMzg4Ljc0IDE4NTMuMjIgMjMyOC4xIDE4NzguMDFDMjI2Ny40NiAxOTAyLjc5IDIyMDAuNzUgMTkxNS43MSAyMTI3Ljk4IDE5MTYuNzdMMjExOC40OSAxODg5Ljg3QzIxNjkuMTEgMTg1OC4yMyAyMjA2LjgxIDE4MTguMTYgMjIzMS42IDE3NjkuNjRDMjI1Ni4zOCAxNzIxLjEzIDIyNjguNzggMTY2NS4yMyAyMjY4Ljc4IDE2MDEuOTVMMjI2OC43OCA2MzIuMTgyTDI2MjEuNTYgNjMyLjE4MkwyNjIxLjU2IDcyNy4xMDJaIiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMjM4Ny40MyAyMTAzLjQ0TDIzODIuNjggMjE3NC42M0MyMzgyLjY4IDIxODYuMjQgMjM4OS41NCAyMjAyLjA2IDI0MDMuMjUgMjIyMi4wOUMyNDE4LjAxIDIyNDMuMTkgMjQyNS4zOSAyMjU5LjAxIDI0MjUuMzkgMjI2OS41NUMyNDI1LjM5IDIyODguNTQgMjQxOS4wNyAyMzA0LjM2IDI0MDYuNDEgMjMxNy4wMUMyMzkzLjc1IDIzMjkuNjcgMjM3Ny45MyAyMzM2IDIzNTguOTUgMjMzNkMyMzQxLjAyIDIzMzYgMjMyNS43MyAyMzI5LjY3IDIzMTMuMDcgMjMxNy4wMUMyMzAwLjQyIDIzMDQuMzYgMjI5NC4wOSAyMjg4LjU0IDIyOTQuMDkgMjI2OS41NUMyMjk0LjA5IDIyNTYuOSAyMzAwLjk0IDIyNDAuNTUgMjMxNC42NSAyMjIwLjUxQzIzMjkuNDIgMjE5OS40MiAyMzM2LjggMjE4NC4xMyAyMzM2LjggMjE3NC42M0wyMzMyLjA2IDIxMDMuNDRMMjIxMC4yNCAyMTAzLjQ0TDIyMTAuMjQgMjAxOS42TDI1MDkuMjQgMjAxOS42TDI1MDkuMjQgMjEwMy40NEwyMzg3LjQzIDIxMDMuNDRaIiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMTc3OC4zNiAxNTExLjc4TDE3NzguMzYgMTAwMi4zN0MxNzc4LjM2IDk1My44NTUgMTc2NS4xNyA5MDguNTA1IDE3MzguODEgODY2LjMxOEMxNzEyLjQ0IDgyNC4xMzEgMTY3NS4yNiA3OTIuNzU1IDE2MjcuMjcgNzcyLjE4OUMxNTc5LjI5IDc1MS42MjMgMTUyMS4yOCA3NDUuNTU4IDE0NTMuMjUgNzUzLjk5NkMxMzg1LjIzIDc2Mi40MzMgMTMwOS41NSA3OTMuNTQ2IDEyMjYuMjQgODQ3LjMzNEwxMTk2LjE4IDc5OS44NzRDMTI0NS43NSA3NDIuOTIyIDEzMDIuOTYgNjk4LjYyNiAxMzY3LjgzIDY2Ni45ODZDMTQzMi42OSA2MzUuMzQ2IDE0OTkuMTMgNjE1LjgzNCAxNTY3LjE2IDYwOC40NTFDMTYzNS4xOCA2MDEuMDY5IDE3MDEuODkgNjA0Ljc2IDE3NjcuMjggNjE5LjUyNUMxODMyLjY3IDYzNC4yOTEgMTg5MS4yIDY1OC41NDggMTk0Mi44OCA2OTIuMjk4QzE5OTQuNTYgNzI2LjA0NyAyMDM2LjIyIDc2OS4wMjUgMjA2Ny44NiA4MjEuMjMxQzIwOTkuNSA4NzMuNDM3IDIxMTUuMzIgOTMzLjI4OSAyMTE1LjMyIDEwMDAuNzlMMjExNS4zMiAxNTExLjc4TDE3NzguMzYgMTUxMS43OFpNMTI1My4xMyA5ODMuMzg2QzEyNTMuMTMgOTY0LjQwMiAxMjYxLjgzIDk0OC4zMTggMTI3OS4yMyA5MzUuMTM1QzEyOTYuNjQgOTIxLjk1MiAxMzE4LjUyIDkxMi4xOTYgMTM0NC44OSA5MDUuODY4QzEzNzEuMjUgODk5LjU0IDEzOTkuNDcgODk2LjExMiAxNDI5LjUyIDg5NS41ODVDMTQ1OS41OCA4OTUuMDU4IDE0ODcuNzkgODk4LjIyMiAxNTE0LjE2IDkwNS4wNzdDMTU0MC41MyA5MTEuOTMyIDE1NjIuNDEgOTIxLjk1MiAxNTc5LjgxIDkzNS4xMzVDMTU5Ny4yMiA5NDguMzE4IDE2MDUuOTIgOTY0LjQwMiAxNjA1LjkyIDk4My4zODZMMTYwNS45MiAxNTExLjc4TDEyNTMuMTMgMTUxMS43OEwxMjUzLjEzIDk4My4zODZaIiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9IjEiIHN0cm9rZT0ibm9uZSIvPgo8cGF0aCBkPSJNMTg2Mi4yIDE3MDkuNTNDMTg2Mi4yIDE3MjguNTEgMTg1NS44NyAxNzQ0LjMzIDE4NDMuMjIgMTc1Ni45OUMxODMwLjU2IDE3NjkuNjQgMTgxNC43NCAxNzc1Ljk3IDE3OTUuNzYgMTc3NS45N0MxNzc3LjgzIDE3NzUuOTcgMTc2Mi4yNyAxNzY5LjM4IDE3NDkuMDkgMTc1Ni4xOUMxNzM1LjkgMTc0My4wMSAxNzI5LjMxIDE3MjcuNDUgMTcyOS4zMSAxNzA5LjUzQzE3MjkuMzEgMTY5MS42IDE3MzUuNjQgMTY3Ni4zIDE3NDguMyAxNjYzLjY1QzE3NjAuOTUgMTY1MC45OSAxNzc2Ljc3IDE2NDQuNjYgMTc5NS43NiAxNjQ0LjY2QzE4MTQuNzQgMTY0NC42NiAxODMwLjU2IDE2NTAuOTkgMTg0My4yMiAxNjYzLjY1QzE4NTUuODcgMTY3Ni4zIDE4NjIuMiAxNjkxLjYgMTg2Mi4yIDE3MDkuNTNaTTE2NDcuMDUgMTcwOS41M0MxNjQ3LjA1IDE3MjguNTEgMTY0MC43MiAxNzQ0LjMzIDE2MjguMDYgMTc1Ni45OUMxNjE1LjQxIDE3NjkuNjQgMTU5OS41OSAxNzc1Ljk3IDE1ODAuNiAxNzc1Ljk3QzE1NjEuNjIgMTc3NS45NyAxNTQ1LjggMTc2OS42NCAxNTMzLjE0IDE3NTYuOTlDMTUyMC40OSAxNzQ0LjMzIDE1MTQuMTYgMTcyOC41MSAxNTE0LjE2IDE3MDkuNTNDMTUxNC4xNiAxNjkxLjYgMTUyMC40OSAxNjc2LjMgMTUzMy4xNCAxNjYzLjY1QzE1NDUuOCAxNjUwLjk5IDE1NjEuNjIgMTY0NC42NiAxNTgwLjYgMTY0NC42NkMxNTk5LjU5IDE2NDQuNjYgMTYxNS40MSAxNjUwLjczIDE2MjguMDYgMTY2Mi44NkMxNjQwLjcyIDE2NzQuOTkgMTY0Ny4wNSAxNjkwLjU0IDE2NDcuMDUgMTcwOS41M1oiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjxwYXRoIGQ9Ik03NDYuODg5IDE0MTguNDRMNzQ2Ljg4OSA0MTMuODY1Qzc0Ni44ODkgMzQ2LjM2NiA3NTcuOTYzIDI4OC4zNiA3ODAuMTExIDIzOS44NDVDODAyLjI1OSAxOTEuMzMgODMxLjI2MyAxNTIuMDQ0IDg2Ny4xMjEgMTIxLjk4NkM5MDIuOTggOTEuOTI3NSA5NDIuNzk0IDcxLjA5NzggOTg2LjU2MyA1OS40OTY1QzEwMzAuMzMgNDcuODk1MSAxMDc0LjM2IDQ1LjI1ODQgMTExOC42NiA1MS41ODY0QzExNjIuOTYgNTcuOTE0NSAxMjA0LjYyIDcyLjk0MzUgMTI0My42NCA5Ni42NzM1QzEyODIuNjYgMTIwLjQwNCAxMzE0LjgzIDE1Mi44MzUgMTM0MC4xNCAxOTMuOTY3TDEzMTAuMDggMjM2LjY4MUMxMjc0LjIyIDIxMi40MjMgMTI0Mi4zMiAxOTkuNzY3IDEyMTQuMzcgMTk4LjcxM0MxMTg2LjQyIDE5Ny42NTggMTE2Mi42OSAyMDUuNTY4IDExNDMuMTggMjIyLjQ0M0MxMTIzLjY3IDIzOS4zMTcgMTEwOC45IDI2My4zMTEgMTA5OC44OCAyOTQuNDI0QzEwODguODcgMzI1LjUzNyAxMDgzLjg2IDM2MC42MDQgMTA4My44NiAzOTkuNjI3TDEwODMuODYgMTQxOC40NEwxMDgzLjg2IDE1MTEuNzhMNzQ2Ljg4OSAxNTExLjc4TDc0Ni44ODkgMTQxOC40NFoiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iMSIgc3Ryb2tlPSJub25lIi8+CjwvZz4KPC9nPgo8L3N2Zz4K";

module.exports = { logoBase64 };
