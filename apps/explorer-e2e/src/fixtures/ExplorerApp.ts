import { Locator, Page } from 'playwright'
import { SEARCHBAR } from './constants'

export class ExplorerApp {
  private readonly searchBar: Locator

  constructor(public readonly page: Page) {
    this.searchBar = this.page.locator(SEARCHBAR)
  }

  async navigateBySearchBar(searchTerm: string) {
    await this.searchBar.click()
    await this.searchBar.fill(searchTerm)
    await this.page.keyboard.press('Enter')
  }

  async goTo(url: string) {
    await this.page.goto(url)
  }
}
