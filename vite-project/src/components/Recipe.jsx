import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Recipe.css'
import Loader from './ui/Loader'

function Recipe() {
  const [searchTerm, setSearchTerm] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedRecipe, setExpandedRecipe] = useState(null)

  const searchRecipes = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a recipe name to search')
      return
    }

    setLoading(true)
    setError('')
    setExpandedRecipe(null)
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()
      
      if (data.meals && data.meals.length > 0) {
        setRecipes(data.meals)
      } else {
        setRecipes([])
        setError('No recipes found. Try a different search term.')
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }


  const toggleRecipeDetails = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId)
  }

  const getIngredients = (recipe) => {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`]
      const measure = recipe[`strMeasure${i}`]
      if (ingredient && ingredient.trim()) {
        ingredients.push({ name: ingredient, measure: measure || 'Some' })
      }
    }
    return ingredients
  }

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <div className="logo-icon">🍳</div>
            <h1 className="title">Recipe Finder</h1>
          </div>
          <p className="subtitle">Discover amazing recipes from around the world</p>
          
          {/* Modern Search Bar */}
          <div className="search-container">
            <div className="search-wrapper">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchTerm.trim()) {
                    searchRecipes();
                  }
                }}
                placeholder="Search for recipes..."
                className="search-input"
              />
              <button 
                onClick={searchRecipes}
                disabled={loading}
                className="search-button"
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>
        </div>
        
      </div>

      {/* Content Section */}
      <div className="content-section">
        {error && (
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <div className="error-content">
              <h4 className="error-title">Oops!</h4>
              <p className="error-text">{error}</p>
            </div>
            <button 
              onClick={() => setError('')}
              className="error-close"
            >
              ✕
            </button>
          </div>
        )}

        {loading && (
          <div className="loading-card" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'14px'}}>
            <Loader text="Finding delicious recipes..." />
            <p className="loading-text">Finding delicious recipes...</p>
          </div>
        )}

        {recipes.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <h2 className="results-title">
                {recipes.length} Recipe{recipes.length !== 1 ? 's' : ''} Found
              </h2>
              <p className="results-subtitle">Explore these delicious options</p>
            </div>
            
            <div className="recipes-grid">
              {recipes.map((recipe, index) => (
                <div 
                  key={recipe.idMeal} 
                  className="recipe-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="recipe-image-container">
                    <img 
                      src={recipe.strMealThumb} 
                      alt={recipe.strMeal}
                      className="recipe-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/f8f9fa/6c757d?text=No+Image'
                      }}
                    />
                    <div className="recipe-overlay">
                      <div className="recipe-badges">
                        <span className="category-badge">{recipe.strCategory}</span>
                        {recipe.strArea && (
                          <span className="area-badge">{recipe.strArea}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="recipe-content">
                    <h3 className="recipe-title">{recipe.strMeal}</h3>
                    
                    <div className="recipe-meta">
                      <div className="meta-item">
                        <span className="meta-icon">📂</span>
                        <span>{recipe.strCategory}</span>
                      </div>
                      {recipe.strArea && (
                        <div className="meta-item">
                          <span className="meta-icon">🌍</span>
                          <span>{recipe.strArea}</span>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => toggleRecipeDetails(recipe.idMeal)}
                      className="details-button"
                    >
                      {expandedRecipe === recipe.idMeal ? 'Hide Details' : 'View Recipe'}
                      <span className="button-icon">
                        {expandedRecipe === recipe.idMeal ? '▲' : '▼'}
                      </span>
                    </button>

                    {expandedRecipe === recipe.idMeal && (
                      <div className="recipe-details">
                        <div className="details-section">
                          <h4 className="section-title">
                            <span className="section-icon">🥘</span>
                            Ingredients
                          </h4>
                          <div className="ingredients-grid">
                            {getIngredients(recipe).map((ingredient, index) => (
                              <div key={index} className="ingredient-item">
                                <span className="ingredient-measure">
                                  {ingredient.measure}
                                </span>
                                <span className="ingredient-name">
                                  {ingredient.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="details-section">
                          <h4 className="section-title">
                            <span className="section-icon">📝</span>
                            Instructions
                          </h4>
                          <div className="instructions-container">
                            {recipe.strInstructions
                              .replace(/\r?\n/g, '\n')
                              .split('\n')
                              .filter(step => step.trim())
                              .map((step, index) => (
                              <div key={index} className="instruction-step">
                                <span className="step-number">{index + 1}</span>
                                <p className="step-text">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {recipe.strYoutube && (
                          <div className="video-section">
                            <a 
                              href={recipe.strYoutube} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="video-link"
                            >
                              <span className="video-icon">📺</span>
                              Watch on YouTube
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{textAlign:'center', padding:'20px'}}>
        <Link to="/" className="video-link" style={{display:'inline-block'}}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  
  // Hero Section
  heroSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '100px 20px',
    textAlign: 'center',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center'
  },
  
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  },
  
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px'
  },
  
  logoIcon: {
    fontSize: '3rem',
    animation: 'bounce 2s infinite'
  },
  
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    margin: '0',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },
  
  subtitle: {
    fontSize: '1.3rem',
    marginBottom: '50px',
    opacity: 0.9,
    fontWeight: '300'
  },
  
  searchContainer: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  
  searchWrapper: {
    display: 'flex',
    background: 'white',
    borderRadius: '50px',
    padding: '8px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    alignItems: 'center'
  },
  
  searchIcon: {
    padding: '0 20px',
    fontSize: '1.2rem',
    color: '#667eea'
  },
  
  searchInput: {
    flex: 1,
    padding: '20px 0',
    border: 'none',
    outline: 'none',
    fontSize: '1.1rem',
    background: 'transparent',
    color: '#333'
  },
  
  searchButton: {
    padding: '20px 30px',
    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '120px',
    justifyContent: 'center'
  },
  
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  
  // Content Section
  contentSection: {
    padding: '80px 20px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  
  // Error Card
  errorCard: {
    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
    color: 'white',
    padding: '25px',
    borderRadius: '20px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
  },
  
  errorIcon: {
    fontSize: '2rem'
  },
  
  errorContent: {
    flex: 1
  },
  
  errorTitle: {
    margin: '0 0 5px 0',
    fontSize: '1.2rem',
    fontWeight: '600'
  },
  
  errorText: {
    margin: '0',
    fontSize: '1rem',
    opacity: 0.9
  },
  
  errorClose: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  // Loading Card
  loadingCard: {
    textAlign: 'center',
    padding: '80px 20px',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  
  loadingSpinner: {
    width: '60px',
    height: '60px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 30px'
  },
  
  loadingText: {
    fontSize: '1.3rem',
    color: '#667eea',
    fontWeight: '500',
    margin: 0
  },
  
  // Results Section
  resultsSection: {
    marginTop: '40px'
  },
  
  resultsHeader: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  
  resultsTitle: {
    fontSize: '2.8rem',
    color: '#2d3748',
    marginBottom: '15px',
    fontWeight: '700'
  },
  
  resultsSubtitle: {
    fontSize: '1.2rem',
    color: '#718096',
    margin: 0
  },
  
  // Recipe Grid
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '40px',
    marginTop: '40px',
    width: '100%'
  },
  
  recipeCard: {
    background: 'white',
    borderRadius: '25px',
    overflow: 'hidden',
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
    transition: 'all 0.4s ease',
    animation: 'fadeInUp 0.6s ease forwards',
    opacity: 0,
    transform: 'translateY(30px)'
  },
  
  recipeImageContainer: {
    position: 'relative',
    height: '280px',
    overflow: 'hidden'
  },
  
  recipeImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease'
  },
  
  recipeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '25px'
  },
  
  recipeBadges: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  
  categoryBadge: {
    background: 'rgba(255,255,255,0.95)',
    color: '#2d3748',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  
  areaBadge: {
    background: 'rgba(102, 126, 234, 0.95)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  
  recipeContent: {
    padding: '30px'
  },
  
  recipeTitle: {
    fontSize: '1.6rem',
    color: '#2d3748',
    marginBottom: '20px',
    fontWeight: '700',
    lineHeight: '1.3'
  },
  
  recipeMeta: {
    display: 'flex',
    gap: '25px',
    marginBottom: '25px',
    flexWrap: 'wrap'
  },
  
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#718096',
    fontSize: '1rem'
  },
  
  metaIcon: {
    fontSize: '1.1rem'
  },
  
  detailsButton: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
  },
  
  buttonIcon: {
    fontSize: '0.9rem',
    transition: 'transform 0.3s ease'
  },
  
  recipeDetails: {
    marginTop: '30px',
    paddingTop: '30px',
    borderTop: '1px solid #e2e8f0'
  },
  
  detailsSection: {
    marginBottom: '30px'
  },
  
  sectionTitle: {
    fontSize: '1.3rem',
    color: '#2d3748',
    marginBottom: '20px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  
  sectionIcon: {
    fontSize: '1.4rem'
  },
  
  ingredientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '15px'
  },
  
  ingredientItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: '#f8fafc',
    borderRadius: '12px',
    fontSize: '1rem',
    border: '1px solid #e2e8f0'
  },
  
  ingredientMeasure: {
    fontWeight: '700',
    color: '#667eea',
    minWidth: '70px',
    fontSize: '0.9rem'
  },
  
  ingredientName: {
    color: '#4a5568',
    fontWeight: '500'
  },
  
  instructionsContainer: {
    space: '20px'
  },
  
  instructionStep: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    alignItems: 'flex-start'
  },
  
  stepNumber: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1rem',
    flexShrink: 0,
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
  },
  
  stepText: {
    color: '#4a5568',
    lineHeight: '1.7',
    margin: 0,
    flex: 1,
    fontSize: '1rem'
  },
  
  videoSection: {
    textAlign: 'center',
    marginTop: '25px'
  },
  
  videoLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
    color: 'white',
    textDecoration: 'none',
    padding: '15px 30px',
    borderRadius: '30px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(255, 107, 107, 0.4)',
    fontSize: '1rem'
  },
  
  videoIcon: {
    fontSize: '1.2rem'
  }
}

export default Recipe

