import { Locator, Page } from 'playwright'
import { SEARCHBAR } from './constants'
import path from 'path'

export class ExplorerApp {
  // If no baseUrl is provided, use the default address and port for:
  // explorer:serve:development-testnet-zen.
  public readonly baseUrl: string = 'http://localhost:3005'
  private readonly searchBar: Locator

  constructor(public readonly page: Page, customBaseUrl?: string) {
    this.searchBar = this.page.locator(SEARCHBAR)
    if (customBaseUrl) {
      this.baseUrl = customBaseUrl
    }
  }

  async navigateBySearchBar(searchTerm: string) {
    await this.searchBar.click()
    await this.searchBar.fill(searchTerm)
    await this.page.keyboard.press('Enter')
  }

  async goTo(url: string) {
    await this.page.goto(path.join(this.baseUrl, url))
  }
}
